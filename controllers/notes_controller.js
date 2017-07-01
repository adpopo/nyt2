var express = require('express');
var router  = express.Router();
var models  = require('../models');
var Article = models.Article;
var Note = models.Note;

// Create a new note
router.post("/api/notes/:id", function(req, res) {
	var newNote = new Note(req.body);
	newNote.save(function(error, note) {
		if (error) {
			console.log(error);
		}
		else {
			// Find and update notes
			Article.findOneAndUpdate(
				{ "_id": req.params.id },
				{ $push: { note: note._id } },
				{ safe: true, new : true }
			)
			.exec(function(err, nt) {
				if (err) {
					console.log(err);
				}
				else {
					res.send(nt);
				}
			});
		}
	});
});

module.exports = router;