$(document).ready(function(){

	var gmapkey = config.GMAPS_KEY;
	// google maps API key, hidden from public repo

	$("#back-home").on("click", function(event){
		event.preventDefault();
		window.location.href = "/";
	});

	$(".closeInfo").click(function(){
		$("#signInfo").fadeToggle("fast", "linear");
	});

	function getResults() {
		// Empty any results currently on the page
		$("#results").empty();
		// Grab all of the current signs
		$.getJSON("/api/all", function(data) {
    		var signDateArr = [];
    		// store unique dates in this array,
    		var x = 0;
    		// counter for array
			for (var i = 0; i < data.length; i++) {
				// if there is a repeat we do nothing...
				if (signDateArr.includes(data[i].date)) {
				}
				else {
					signDateArr.push(data[i].date);
					for (var y = 0; y < data.length; y++) {
						if (data[i].date === data[y].date) {
							$("#results").prepend(`<u><a class="signInfo" data-index="${y}" style="margin-left:25px">${data[y].company}</a><br><br>`);
							// dynamically appended button that pops up modal so user can see full posting info
							// INSTEAD of company name we can just show pictures of signs and then user can click on it to pop up modal
						}
					}
					$("#results").prepend(`<div class = "notification is-info"><strong style="color:white;">${signDateArr[x]}</strong></div>`);
					x++;
				}

			}
			$('.signInfo').each(function(){
				$(this).on("click", function(event){
					event.preventDefault();
					$("#signModalInfo").empty();
					var signNum = $(this).data('index');
					var modalBody = $("#signModalInfo");
					modalBody.append(
						`<div>Company: <strong>${data[signNum].company}</strong></div>
						<div>Date Added: <strong>${data[signNum].date}</strong></div>
						<div>Description: ${data[signNum].description}</div>
						<div id="googleMap" style="width:100%;height:400px;"></div>
						<script>
							function myMap() {
								var latlon1 = new google.maps.LatLng(${data[signNum].latlon});
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
						<script src="https://maps.googleapis.com/maps/api/js?key=${gmapkey}&callback=myMap"></script>
						<div>(Location based on latitude / longitude coordinates: <strong>${data[signNum].latlon}</strong>)</div>`);
					$("#signInfo").fadeToggle("fast, linear");
				});
			});
		});
	}
	getResults();
});
