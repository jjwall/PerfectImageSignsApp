var path = require("path");
//var mongojs = require("mongojs");

// Routes
// =============================================================
module.exports = function(app) {
	// POST route for adding a new sign
	app.post("/api/signs", function(req, res) {
		console.log(req.body);
		// Insert the sign into the signs collection
		db.signs.insert(req.body, function(error, saved) {
			// Log any errors
			if (error) {
				console.log(error);
			}
			// Otherwise, send the sign back to the browser
			// This will fire off the success function of the ajax request
			else {
				res.send(saved);
			}
		});
	});

};