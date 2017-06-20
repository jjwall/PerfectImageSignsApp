var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/index.html"));
	});

	app.get("/post-sign", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/postsign.html"))
	})

};