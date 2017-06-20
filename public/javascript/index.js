$(document).ready(function(){
	$("#post-sign").on("click", function(event){
		event.preventDefault();
	 	window.location.href = "/post-sign";

	});

	$("#sign-date").on("click", function(event){
		event.preventDefault();
		window.location.href = "/sign-date";
	})
});