var React = require("react");
import helpers from "./../utils/helpers";

class Results extends React.Component {
	constructor(props) {
		super(props);
		this.saveArticle = this.saveArticle.bind(this);
	}

	render() {
		return (
			<div id="resultSection" className="row">
			{/*search results here*/}
				<div className="page-header">
					<h2>Results</h2>
				</div>
				<div className="panel panel-primary">
					<div className="panel-body">
						<ul id="news" className="list-group">
							{this.props.results.hasOwnProperty("error") ?
								<span>{this.props.results.error}</span> :
								 this.props.results.map( (article,articleIndex) =>
								 	<li className="titleNews list-group-item row" key={article._id}>
										<div className="col-md-8"><a href={article.web_url}>{article.lead_paragraph}</a></div>
										<div className="col-md-4 text-center">
											<button type="button" className="btn btn-success pull-right"
												onClick={this.saveArticle} value={articleIndex} disabled={article.btnDisabled}>Save</button>
										</div>
									</li>
								)
							}
						</ul>
					</div>
				</div>
			</div>
		);
	}


	// Save an article
	saveArticle(event) {
		event.preventDefault();
		let index = parseInt(event.target.value);
		// Get the article from the array of articles
		let articleData = this.props.results[index];
		let title = articleData["snippet"];
		let url = articleData["web_url"];
		helpers.saveArticle(title,url).then((data) => {
			// update savedArticles
			this.props.addArticle(data);
			this.props.updateDisabledResults(index);
		});

	}
}

export default Results;