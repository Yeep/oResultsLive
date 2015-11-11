var xml2js = require('xml2js');
var xpath = require('xpath');
var select = xpath.useNamespaces({'iof3': 'http://www.orienteering.org/datastandard/3.0'});
var dom = require('xmldom').DOMParser;
var fs = require('fs');
var EventTypes = require('../models/Event');

var IofXmlParser = function(configuration) {
	console.dir('Creating IOF XML parser');
	this.configuration = configuration;
};

IofXmlParser.prototype.fetchResults = function() {
	var xml = fs.readFileSync(this.configuration.results, 'utf8');
	return new dom().parseFromString(xml);
};

IofXmlParser.prototype.resultsForClass = function(classId) {
	var doc = this.fetchResults();
	
	var xpathString = "//iof3:ClassResult[./iof3:Class/iof3:Id = '" + classId + "']";
	var nodes = select(xpathString, doc);
	
	if (nodes.length == 0) {
		return {
			type: 'error',
			message: 'No results were found for class ' + classId + '.'
		}
	}
	
	return this.buildResults(nodes)[0];
};

// Helper method to handle dom nodes potentially being 0
function getNodeValue(node) {
	if (node != null) {
		return node.toString();
	}
	return node;
}

IofXmlParser.prototype.buildResults = function(nodes) {
	var self = this;

	//console.log(nodes);
	var classes = [];
	nodes.forEach(function (node) {
		var c = new EventTypes.Class({
			id: getNodeValue(select('./iof3:Class/iof3:Id/text()', node)[0]),
			name: getNodeValue(select('./iof3:Class/iof3:Name/text()', node)[0]),
			course: new EventTypes.Course({
				id: getNodeValue(select('./iof3:Course/iof3:Id/text()', node)[0]),
				name: getNodeValue(select('./iof3:Course/iof3:Name/text()', node)[0]),
				length: getNodeValue(select('./iof3:Course/iof3:Length/text()', node)[0]),
				climb: getNodeValue(select('./iof3:Course/iof3:Climb/text()', node)[0]),
			}),
			results: self.buildPersonResults(select('./iof3:PersonResult', node))
		});
		classes.push(c);
	});
	return classes;
};

IofXmlParser.prototype.buildPersonResults = function(nodes) {
	var self = this;
	
	var results = [];
	nodes.forEach(function (node) {
		var r = new EventTypes.Result({
			person: new EventTypes.Person({
				id: getNodeValue(select('./iof3:Person/iof3:Id/text()', node)[0]),
				familyName: getNodeValue(select('./iof3:Person/iof3:Name/iof3:Family/text()', node)[0]),
				givenName: getNodeValue(select('./iof3:Person/iof3:Name/iof3:Given/text()', node)[0])
			}),
			club: new EventTypes.Club({
				id: getNodeValue(select('./iof3:Organisation/iof3:Id/text()', node)[0]),
				name: getNodeValue(select('./iof3:Organisation/iof3:Name/text()', node)[0]),
				country: new EventTypes.Country({
					code: getNodeValue(select('./iof3:Organisation/iof3:Country/@code', node)[0]),
					name: getNodeValue(select('./iof3:Organisation/iof3:Country/text()', node)[0])
				})
			}),
			position: getNodeValue(select('./iof3:Result/iof3:Position/text()', node)[0]),
			startTime: Date.parse(getNodeValue(select('./iof3:Result/iof3:StartTime/text()', node)[0])),
			finishTime: Date.parse(getNodeValue(select('./iof3:Result/iof3:Position/text()', node)[0])),
			time: getNodeValue(select('./iof3:Result/iof3:Time/text()', node)[0]),
			status: getNodeValue(select('./iof3:Result/iof3:Status/text()', node)[0]),
			course: new EventTypes.Course({
				id: getNodeValue(select('./iof3:Result/iof3:Course/iof3:Id/text()', node)[0]),
				name: getNodeValue(select('./iof3:Result/iof3:Course/iof3:Name/text()', node)[0]),
				length: getNodeValue(select('./iof3:Result/iof3:Course/iof3:Length/text()', node)[0]),
				climb: getNodeValue(select('./iof3:Result/iof3:Course/iof3:Climb/text()', node)[0]),
			}),
			splits: self.buildSplits(select('./iof3:Result/iof3:SplitTime', node))
		});
		results.push(r);
	});
	return results;
};

IofXmlParser.prototype.buildSplits = function(nodes) {
	var splits = [];
	nodes.forEach(function (node) {
		var s = new EventTypes.Split({
			controlCode: getNodeValue(select('./iof3:ControlCode/text()', node)[0]),
			time: getNodeValue(select('./iof3:Time/text()', node)[0])
		});
		splits.push(s);
	});
	return splits;
};

IofXmlParser.prototype.parse = function(xml) {
	var resultsJson;
	xml2js.parseString(xml, function(error, result) {
		if (error) {
			throw error;
		}
		resultsJson = result;
	});
	
	return resultsJson;
};

module.exports = IofXmlParser;