var AutoDownloadDbParser = function(configuration) {
	console.log('Creating AutoDownload Database parser');
	this.configuration = configuration;
};

AutoDownloadDbParser.prototype.fetchResults = function() {
	console.log("Fetching");
}

AutoDownloadDbParser.prototype.parse = function(xml) {
	console.log("Parsing");
};

module.exports = AutoDownloadDbParser;