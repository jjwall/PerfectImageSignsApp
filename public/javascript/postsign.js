$(document).ready(function(){

	var companyName = $("#company-name");

	var description = $("#description");

	var gmapkey = config.GMAPS_KEY;

	$("#back-home").on("click", function(event){
		event.preventDefault();
		window.location.href = "/";
	});

	$("#submit-post").on("click", function(event){
		event.preventDefault();
		checkNull();
	});

	$(".closeModal").click(function(){
		$("#latlonModal").fadeToggle("fast", "linear");
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
  		alert("Either your device and/or browser does not support Geolocation. Getting coordinates from your IP address which may not be entirely accurate, please update accordingly:");
			$("#submit-post").removeClass("is-loading");
			$.ajax({
				type: "GET",
				url: 'http://freegeoip.net/json',
				dataType: 'jsonp'
			}).done(function(data){
				console.log(data);
				$("#latlonModalInfo").empty();
				$("#latlonModal").fadeToggle("fast", "linear");
				$("#latlonModalInfo").append(`
					<div class="field">
						<p>Company Name:</p>
						<p class="control">
							<input class="input" id="company-name2" type="text" value="${postCompanyName}">
						</p>
					</div>
					<div class="field">
						<p>Description:</p>
						<p class="control">
							<input class="input" id="description2" type="text" value="${postDescription}">
						</p>
					</div>
					<div class="field">
						<p>Latitude:</p>
						<p class="control">
							<input class="input" id="latitude2" type="text" value="${data.latitude}">
						</p>
					</div>
					<div class="field">
						<p>Longitude:</p>
						<p class="control">
							<input class="input" id="longitude2" type="text" value="${data.longitude}">
						</p>
					</div>
					<div id="googleMap" style="width:100%;height:400px;"></div>
					<a class="button is-success is-outlined" id="submit-post2">Submit</a><a class="button is-info is-outlined" id="checkMap" style="margin-left:5px;">Refresh Map</a>
					<br>
					<br>
					<div id="submitPostError2"></div>
					<script>

						var globalDate = moment().format('MMMM Do, YYYY');

						var globalLat = $("#latitude2").val();

						var globalLon = $("#longitude2").val();

						$("#submit-post2").on("click", function(event){
							event.preventDefault();
							checkNull2();
						});

						function checkNull2 () {
							if ($("#company-name2").val() === "" || $("#description2").val() === "" || $("#latitude2").val() === "" || $("#longitude2").val() === "") {
								$("#submitPostError2").empty();
								$("#submitPostError2").append("<div><p>All fields need to be filled out!</p></div>");
								if ($("#company-name2").val() === "") {
									$("#company-name2").removeClass("is-success");
									$("#company-name2").addClass("is-danger");
								}
								if ($("#description2").val() === "") {
						      $("#description2").removeClass("is-success");
									$("#description2").addClass("is-danger");
								}
								if ($("#latitude2").val() === "") {
						      $("#latitude2").removeClass("is-success");
									$("#latitude2").addClass("is-danger");
								}
								if ($("#longitude2").val() === "") {
						      $("#longitude2").removeClass("is-success");
									$("#longitude2").addClass("is-danger");
								}
							}
							else {
								submitPost2();
							}
						}

						function submitPost2 () {
							$("#latlonModal").fadeToggle("fast", "linear");
							$.ajax({
								type: "POST",
								dataType: 'json',
								url: '/api/signs',
								data: {
									company: $("#company-name2").val(),
									description: $("#description2").val(),
									date: globalDate,
									latlon: $("#latitude2").val() + "," + $("#longitude2").val()
								},
								success: function (output) {
									console.log(output);
								},
								error: function (request, status, error) {
									$("#submit-post").removeClass("is-loading");
									alert(request.responseText);
								}
							}).done(function(data) {
								$("#company-name2").val("");
								$("#description2").val("");
								$("#latitude2").val("");
								$("#longitude2").val("");
								alert("Post successfully submitted!");
							});
						}

						function myMap() {
							var latlon1 = new google.maps.LatLng($("#latitude2").val(),$("#longitude2").val());
							var mapProp = {
								center: latlon1,
								zoom:14,
								mapTypeId:google.maps.MapTypeId.ROADMAP,
								mapTypeControl:false,
								navigationControlOptions:
								{style:google.maps.NavigationControlStyle.SMALL}
							};
							var map = new
								google.maps.Map(document.getElementById("googleMap"), mapProp);
							var marker = new
								google.maps.Marker({position:latlon1,map:map,title:"Sign located here!"});
						}
					</script>
					<script src="https://maps.googleapis.com/maps/api/js?key=${gmapkey}&callback=myMap"></script>`);
				//alert(`lat: ${data.latitude} lon: ${data.longitude}`);
			});
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
