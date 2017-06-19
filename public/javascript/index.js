$(document).ready(function(){
	$("#post-sign").on("click", function(event){
		event.preventDefault();
		// $.ajax({
	 //        method: "POST",
	 //        url: "/api/admin",
	 //        data: newAdmin
	 //    })
	 //    .done(function(data) {
	 //        console.log(data);
	 //        window.location.href = "/post-sign/" + data.id;
	 //    });

	 window.location.href = "/post-sign";

	});
});