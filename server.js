
// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Create instance of express
var app = express();

// Run morgan for logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Set the public assets
app.use(express.static("./public"));

// MongoDB configuration with mongoose
var dbConnection = process.env.MONGODB_URI || "mongodb://localhost/nytreact";
mongoose.connect(dbConnection);
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

// Once logged into the db through mongoose, log a success message
db.once("open", function() {
	console.log("Mongoose connection successful.");
});

// Model controllers
var articles_controller = require('./controllers/articles_controller');
var notes_controller = require('./controllers/notes_controller');
app.use('/', articles_controller);
app.use('/', notes_controller);

module.exports = app;