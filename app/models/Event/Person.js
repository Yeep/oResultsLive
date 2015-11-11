var Person = function(config) {
	this.id = config.id;
	this.familyName = config.familyName;
	this.givenName = config.givenName;
};

module.exports = Person;