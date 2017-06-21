$(document).ready(function(){

	var companyName = $("#company-name");

	var description = $("#description");

	$("#back-home").on("click", function(event){
		event.preventDefault();
		window.location.href = "/";
	});

	$("#submit-post").on("click", function(event){
		event.preventDefault();
		checkNull();
	});

	function checkNull () {
		if (companyName.val() === "" || description.val() === "") {
			$("#submitPostError").empty();
			$("#submitPostError").append("<div><p>All fields need to be filled out!</p></div>");
			if (companyName.val() === "") {
				companyName.removeClass("is-success");
				companyName.addClass("is-danger");
			}
			if (description.val() === "") {
	      		description.removeClass("is-success");
				description.addClass("is-danger");
			}
		}
		else {
			submitPost();
		}
	}

	// lot going into the submitPost function, we use getLocation and showPosition
	// to utilize the HTML5 Geolocation API, we capture data that was inputed for
	// company name and description of sign on the client-side and we use moment.js
	// to automatically calculate today's date for extra submission information
	// high-level interface here to meet demands for freelance project
	function submitPost () {
		console.log("Company Name and description successfully submitted");
		var postCompanyName = $("#company-name").val().trim();
		var postDescription = $("#description").val().trim();
		// data being sent to DataBase will include:
		// company name, description, date, geolocation data, picture info~

		function getLocation() {
    		if (navigator.geolocation) {
       			navigator.geolocation.getCurrentPosition(showPosition);
    		} 
    		else {
        		console.log("Geolocation is not supported by this browser.");
    		}
		}

		getLocation()

		function showPosition(position) {
			$("#submit-post").addClass("is-loading");
			// adds loading circle while ajax waits for success function
    		// console.log("Latitude: " + position.coords.latitude + 
    		// " Longitude: " + position.coords.longitude);
    		// have to put a 'naked' ajax call here to allow browser to obtain geolocation data
    		$.ajax({
    			error: function () {
    				alert("There was an AJAX error!");
    			},
    			success: function() {
    				console.log("We did it!");
    				// embed another ajax call to POST all data to MongoDB
    				$.ajax({
    				//var newPost = {
    					type: "POST",
    					dataType: 'json',
    					url: '/api/signs',
    					crossDomain: true,
    					data: {
							company: postCompanyName,
							description: postDescription,
							date: moment().format('MMMM Do, YYYY'),
							latlon: position.coords.latitude + "," + position.coords.longitude
						},
						success: function () {
							alert("data sent");
						},
						error: function () {
							alert("AJAX POST error");
						}
					//}
					//console.log(newPost);
					}).done(function(data) {
						companyName.val("");
	      				description.val("");
	      				companyName.removeClass("is-danger");
	      				description.removeClass("is-danger");
	        			companyName.addClass("is-success");
	        			description.addClass("is-success");
	        			$("#submit-post").removeClass("is-loading");
	        			$("#submitPostError").empty();
	        			$("#submitPostError").append("<div><p>Post successfully submitted!</p></div>");
	        		});
    			}
    		});
		}
		showPosition();
	}
});