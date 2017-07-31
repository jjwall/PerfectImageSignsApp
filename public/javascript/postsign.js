$(document).ready(function(){

	/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-setclasses !*/
!function(n,e,s){function o(n,e){return typeof n===e}function a(){var n,e,s,a,i,l,r;for(var c in f)if(f.hasOwnProperty(c)){if(n=[],e=f[c],e.name&&(n.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(s=0;s<e.options.aliases.length;s++)n.push(e.options.aliases[s].toLowerCase());for(a=o(e.fn,"function")?e.fn():e.fn,i=0;i<n.length;i++)l=n[i],r=l.split("."),1===r.length?Modernizr[r[0]]=a:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=a),t.push((a?"":"no-")+r.join("-"))}}function i(n){var e=r.className,s=Modernizr._config.classPrefix||"";if(c&&(e=e.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");e=e.replace(o,"$1"+s+"js$2")}Modernizr._config.enableClasses&&(e+=" "+s+n.join(" "+s),c?r.className.baseVal=e:r.className=e)}var t=[],f=[],l={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(n,e){var s=this;setTimeout(function(){e(s[n])},0)},addTest:function(n,e,s){f.push({name:n,fn:e,options:s})},addAsyncTest:function(n){f.push({name:null,fn:n})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr;var r=e.documentElement,c="svg"===r.nodeName.toLowerCase();a(),i(t),delete l.addTest,delete l.addAsyncTest;for(var u=0;u<Modernizr._q.length;u++)Modernizr._q[u]();n.Modernizr=Modernizr}(window,document);

	// function handlePermission() {
 //  		navigator.permissions.query({name:'geolocation'}).then(function(result) {
 //    		if (result.state == 'granted') {
 //     			report(result.state);
 //      			//geoBtn.style.display = 'none';
 //    		} else if (result.state == 'prompt') {
 //      			report(result.state);
 //      			//geoBtn.style.display = 'none';
 //      			navigator.geolocation.getCurrentPosition(revealPosition,positionDenied,geoSettings);
 //    		} else if (result.state == 'denied') {
 //      			report(result.state);
 //      			//geoBtn.style.display = 'inline';
 //    		}
 //    		result.onchange = function() {
 //      			report(result.state);
 //    		}
 //  		});
	// }

	// function report(state) {
 //  		console.log('Permission ' + state);
	// }

	// handlePermission();

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

	// test code:
	// function getLoc(){
	// 	while (position === undefined)
	// 	navigator.geolocation.getCurrentPosition(showPos);
	// }
	//
	// function showPos(position) {
	// 	getLoc();
	// 	console.log(position);
	// }
	//getLoc();
	// end test code

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
  		alert("Either your device or browser does not support Geolocation. Please input your long/lat manually:");
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
				//}
				//console.log(newPost);
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
			//} // end success function
			//});
		}
		// showPosition();
	}
});
