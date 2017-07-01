var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	url: {
		type: String,
		unique: true,
		required: true
	},
    date: {
		type: Date
    },
    // Array of note ids
    note: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});
var Article = mongoose.model("Article", ArticleSchema,"Article");
module.exports = Article;