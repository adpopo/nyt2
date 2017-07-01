var React = require("react");
import helpers from "./../utils/helpers";

class Saved extends React.Component {
    constructor(props) {
		super(props);
        this.deleteSavedArticle = this.deleteSavedArticle.bind(this);
	}

	render() {
		return (
			<div id="savedSection" className="row">
                {/*Saved stuff goes here*/}
				<div className="page-header">
					<h2>Saved Articles</h2>
				</div>

                <div className="panel panel-primary">

                    <div className="panel-body">
                        {this.props.savedArticles.map((article,articleIndex) =>
                            <div className="savedArticle col-md-12" key={article._id}>
                                <div className="row">
                                    <div className="col-md-12">Date Saved: {helpers.normalizeDate(article.date)}</div>
                                </div>
                                <div className="row text-center">
            						<div className="col-md-8"><h3>
                                        <a href={article.url}>{article.title}</a></h3>
                                    </div>
                                {/*delete button*/}
            						<div className="col-md-4">
                                        <button type="button" className="btn btn-primary" onClick={this.deleteSavedArticle} value={articleIndex}>Remove</button>
                                    </div>
            					</div>
            				</div>
                        )
                        }
                    </div>
                </div>
			</div>
		);
	}

    // Remove saved article
    deleteSavedArticle(event) {
        let articleIndex = parseInt(event.target.value);
        let article = this.props.savedArticles[articleIndex];
        let articleId = article["_id"];
        helpers.deleteArticle(articleId).then((data) => {
            this.props.deleteArticle(articleIndex);
        });
    }
}

export default Saved;