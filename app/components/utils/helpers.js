import axios from "axios";
const nytAPI = "909b1c1fe6514ff79c445af593f0348a";

const helpers = {
	// exactly what you'd expect: get articles
	getArticles: (keyWord,beginDate,endDate) => {
		const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
		 + keyWord + "&begin_date=" + beginDate + "&end_date=" + endDate + "&api-key=" + nytAPI;

		return axios.get(queryURL).then((response) => {
			//Filter all the articles that don't have snippets or articles that have null or empty snippets
            var articles = response.data.response.docs.filter( article => (article.hasOwnProperty('snippet') && typeof article['snippet'] === 'string' && article['snippet'].length) );
			return articles;
    	});
	},

	//	that think you liked? get it here
	getSavedArticles: () => {
		const queryURL = "/api/saved";

		return axios.get(queryURL).then((savedArticles) => {
			return savedArticles.data;
		});
	},

	//	like that article? use this
	saveArticle: (title,url) => {
		const queryURL = "/api/saved";

		return axios.post(queryURL,{
			title: title,
			url: url
		}).then((res) => {
			return res.data;
		});
	},

	//	no longer like that article? use this
	deleteArticle: (articleId) => {
		const queryURL = "/api/saved";
        return axios({
            method: "delete",
            url: queryURL,
            data: {articleId:articleId},
            params: {}
        }).then((res) => {
			return res;
		});
	},

	//	tell time like a normal human being
	normalizeDate: (dt) => {
		return moment(dt).calendar();
	}
};

// Export helpers
export default helpers;