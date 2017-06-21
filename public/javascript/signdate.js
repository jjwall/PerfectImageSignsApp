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
				// if there is a repeat we do nothing...
				if (signDateArr.includes(data[i].date)) {
					console.log("We doing nothing");
				}
				else {
					signDateArr.push(data[i].date);
					$("#results").prepend(signDateArr[x]);
					// append results in this else statement because if we have unique
					// dates, then this ensures that they will get appended
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