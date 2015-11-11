var Class = function(config) {
	this.id = config.id;
	this.name = config.name;
	
	this.course = config.course;
	
	this.results = config.results;
};

Class.prototype.resultsInOrder = function() {
	return results.sort(function (a, b) {
		return a.position - b.position
	});
};

module.exports = Class;