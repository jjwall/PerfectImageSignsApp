$(document).ready(function(){

	// function getLocation() {
 //    	if (navigator.geolocation) {
 //       		navigator.geolocation.getCurrentPosition(showPosition);
 //    	} 
 //    	else {
 //        	console.log("Geolocation is not supported by this browser.");
 //    	}
	// }

	// function showPosition(position) {
 //    	console.log("Latitude: " + position.coords.latitude + 
 //    	" Longitude: " + position.coords.longitude)
 //    	// .done(function(){
 //    	// 	console.log("You're position was found");
 //    	// });
 //    	$.ajax({
 //    		success: function() {
 //    			console.log("We did it!");
 //    		}
 //    	})
	// }

	// getLocation();

	// showPosition();

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
    		console.log("Latitude: " + position.coords.latitude + 
    		" Longitude: " + position.coords.longitude)
    		$.ajax({
    			success: function() {
    				console.log("We did it!");
    				var newPost = {
						company: postCompanyName,
						description: postDescription,
						date: moment().format('MMMM Do, YYYY'),
						latlon: `${position.coords.latitude},${position.coords.longitude}`
					}
					console.log(newPost);
					companyName.val("");
	      			description.val("");
	      			companyName.removeClass("is-danger");
	      			description.removeClass("is-danger");
	        		companyName.addClass("is-success");
	        		description.addClass("is-success");
	        		$("#submit-post").removeClass("is-loading");
	        		$("#submitPostError").empty();
	        		$("#submitPostError").append("<div><p>Post successfully submitted!</p></div>");

    			}
    		});
		}

		showPosition();

		// var newPost = {
		// 	company: postCompanyName,
		// 	description: postDescription,
		// 	date: moment().format('MMMM Do, YYYY'),
		// 	latlon: `${position.coords.latitude},${position.coords.longitude}`
		// }
		// console.log(newPost);

		
		// $.ajax({
	 //        method: "POST",
	 //        url: "/api/post",
	 //        data: newPost
	 //    })
	 //    .done(function(data) {
	        //console.log(data);
	       //  companyName.val("");
	      	// description.val("");
	      	// companyName.removeClass("is-danger");
	      	// description.removeClass("is-danger");
	       //  companyName.addClass("is-success");
	       //  description.addClass("is-success");
	       //  $("#submitPostError").empty();
	       //  $("#submitPostError").append("<div><p>Post successfully submitted!</p></div>");
	        // window.location.href = "/admin/" + data.id;
	    // });
	}
});