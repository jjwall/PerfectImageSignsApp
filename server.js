// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var path = require("path");
var logger = require("morgan");
var GMAPIKey = require('./routes/GMapsAPIKey.js');

var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static Directory
app.use(express.static("./public"));

// Database Configuration
//var databaseUrl = "PISdb"; -> local DB address
var databaseUrl = "mongodb://ds135252.mlab.com:35252/heroku_rcltfz79"; // heroku DB address
var collections = ["signs"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);

// Routes
require("./routes/html-routes.js")(app);
//require("./routes/signs-api-routes.js")(app);

// API POST / GET calls (only need 1 post, and 1 get I think)

// Handle sign data submission, save submission to mongo
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

// Retrieve ALL results from mongo, depending on where client is
// i.e. View Signs by Date or View Signs by Company Name
// client side code should be able to filter results
app.get("/api/all", function(req, res) {
  // Find all notes in the notes collection
  db.signs.find({}, function(error, found) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

console.log(GMAPIKey);

// Start express app
app.listen(PORT, function() {
	console.log(`app listening on port ${PORT}`);
});