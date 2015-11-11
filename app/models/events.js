var fs = require('fs');
var path = require('path');

var Parsers = require('../parsers');

var eventsPath = process.env.EVENTS_PATH || './data/events';

var Events = function() { };

Events.prototype.list = function() {
	var events = [];
	var files = fs.readdirSync(eventsPath);
	
	files.forEach(function(item) {
		var fullPath = path.join(eventsPath, item);
		var stats = fs.statSync(fullPath);
		
		if (stats.isFile()) {
			var contents = fs.readFileSync(fullPath, 'utf8');
			events.push(JSON.parse(contents));
		}
	});
	
	return events;
};

Events.prototype.byId = function(id) {
	var events = this.list();
	return events.find(function(event) {
		if (event.id == id) {
			event.parser = new Parsers[event.data.type](event.data.configuration);
			return event;
		}
	});
}

Events.prototype.getResults = function(id) {
	var event = this.byId(id);
	
	return event.parser.fetchResults();
}

Events.prototype.getClasses = function(id) {
	var results = this.getResults(id);
	
	var classes = [];
	
	results.ResultList.ClassResult.forEach(function(eventClass) {
		classes.push(eventClass.Class);
	});
	
	return classes;
}

module.exports = Events;