$(document).ready(function(){

	$("#back-home").on("click", function(event){
		event.preventDefault();
		window.location.href = "/";
	});

	function getResults() {
		// Empty any results currently on the page
		$("#results").empty();
		// Grab all of the current notes
		$.getJSON("/api/all", function(data) {
    	// For each note...
			for (var i = 0; i < data.length; i++) {
				// ...populate #results with a p-tag that includes the note's title and object id
				// $("#results").prepend("<p class='dataentry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
				// data[i]._id + ">" + data[i].title + "</span><span class=deleter>X</span></p>");
				console.log(i + " " + data[i]._id);
				console.log(data[i].company);
				console.log(data[i].description);
				console.log(data[i].date);
				console.log(data[i].latlon);
				$("#results").append(data[i].date);
				// may need to build module within module here....
			}
		});
	}

	getResults();

});