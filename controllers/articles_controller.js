var express = require('express');
var router  = express.Router();
var models  = require('../models');
var Article = models.Article;
var Note = models.Note;
var mongoose = require('mongoose');

router.get("/", function(req, res) {
	res.sendFile(__dirname + "/public/index.html");
});

router.get("/api/saved", function(req, res) {
	Article.find({}).sort([
		["date", "descending"]
	]).limit(10)
    .populate('note')
	.exec(function(err, articles) {
		if (err) throw err;
		res.send(articles);
	});
});

router.post("/api/saved", function(req, res) {
	var entry = new Article({title:req.body.title,url:req.body.url,date:Date.now()});
	entry.save(function(err, doc) {
		if (err)
        {
            console.log(err);
        }
        else
        {
            res.json(doc);
        }
	});
});

router.delete("/api/saved", function(req, res) {
	var articleId = mongoose.Types.ObjectId(req.body.articleId);
	Article.findOneAndRemove(
		{ "_id": articleId},
		function(err, doc) {
			if (err)
	        {
	            console.log(err);
	        }
	        else
	        {
	            res.json(doc);
	        }
		}
	);
});

module.exports = router;