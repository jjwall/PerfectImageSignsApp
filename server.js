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
var databaseUrl = "PISdb";
var collections = ["signs"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);

// Routes
require("./routes/html-routes.js")(app);
require("./routes/signs-api-routes.js")(app);

console.log(GMAPIKey);

// Start express app
app.listen(PORT, function() {
	console.log(`app listening on port ${PORT}`);
});