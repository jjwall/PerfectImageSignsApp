$(document).ready(function(){

	$("#back-home").on("click", function(event){
		event.preventDefault();
		window.location.href = "/";
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
				console.log(data[i].date);
				// if there is a repeat we do nothing...
				if (signDateArr.includes(data[i].date)) {
					console.log("We doing nothing");
					//$("#results").prepend("^^^ " + data[i].company + data[i].date + "<br>");
				}
				else {
					signDateArr.push(data[i].date);
					for (var y = 0; y < data.length; y++) {
						if (data[i].date === data[y].date) {
							$("#results").prepend("<strong>company: </strong>" + data[y].company + "<br>" + "<strong>description: </strong>" + data[i].description +"<br>");
							// here we append actually information for each posting
							// will need slick HTML as there can be any amout of posting per
							// OR we just show picture of sign and then he can click on it
							// module pops up and he can see the full posting info
						}
					}
					$("#results").prepend(`<br><div class = "notification is-info"><strong style="color:white;">${signDateArr[x]}</strong></div>`);
					//"<strong>" + signDateArr[x] + "</strong>"
					//`<div class = "notification is-info"></div>`
					// append the "label date" so Mike can check postings for that date
					x++;
				}
				//console.log(x);
				// ...populate #results with a p-tag that includes the note's title and object id
				// $("#results").prepend("<p class='dataentry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
				// data[i]._id + ">" + data[i].title + "</span><span class=deleter>X</span></p>");
				// console.log(i + " " + data[i]._id);
				// console.log(data[i].company);
				// console.log(data[i].description);
				// console.log(data[i].date);
				// console.log(data[i].latlon);
				//$("#results").append(data[i].date);
				// may need to build module within module here....
			}
			console.log(signDateArr);
		});
	}
	getResults();
});
