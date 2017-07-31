$(document).ready(function(){

	// navigator.permissions.query({name:'geolocation'}).then(function(result){
	// 	alert("permission state: " + result.state);
	// })

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

		if (geo_position_js.init()) {
			$("#submit-post").addClass("is-loading");
			// adds loading circle while browser waits for callback function geo_success or geo_error
  		geo_position_js.getCurrentPosition(geo_success, geo_error);
		}

		function geo_error() {
			// when geo_error fires, we still capture company name and description, but we do not automatically
			// have access to user's lat/lon coordinates. So we pop up a module asking to input lat/lon coordinates manually
  		alert("Either your device and/or browser does not support Geolocation. Please input your long/lat coords manually:");
			$("#submit-post").removeClass("is-loading");
		}

		function geo_success(position) {
			// when geo_success fires, we capture company name, description and lon/lat and send to MongoDB
			$.ajax({
				type: "POST",
				dataType: 'json',
				url: '/api/signs',
				data: {
					company: postCompanyName,
					description: postDescription,
					date: moment().format('MMMM Do, YYYY'),
					latlon: position.coords.latitude + "," + position.coords.longitude
				},
				success: function (output) {
					console.log(output);
				},
				error: function (request, status, error) {
					$("#submit-post").removeClass("is-loading");
					alert(request.responseText);
				}
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
	}
});
