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

	function submitPost () {
		console.log("Company Name and description successfully submitted");
		var postCompanyName = $("#company-name").val().trim();
		var postDescription = $("#description").val().trim();
		var newPost = {
			company: postCompanyName,
			description: postDescription 
		}
		console.log(newPost);
		// $.ajax({
	 //        method: "POST",
	 //        url: "/api/post",
	 //        data: newPost
	 //    })
	 //    .done(function(data) {
	        //console.log(data);
	        companyName.val("");
	      	description.val("");
	      	companyName.removeClass("is-danger");
	      	description.removeClass("is-danger");
	        companyName.addClass("is-success");
	        description.addClass("is-success");
	        $("#submitPostError").empty();
	        $("#submitPostError").append("<div><p>Post successfully submitted!</p></div>");
	        // window.location.href = "/admin/" + data.id;
	    // });
	}
});