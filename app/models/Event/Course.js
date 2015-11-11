var Course = function(config) {
	this.id = config.id;
	this.name = config.name;
	this.length = config.length;
	this.climb = config.climb;
};

module.exports = Course;