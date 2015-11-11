var xml2js = require('xml2js');

var IofXmlParser = function(configuration) { 
	console.dir('Creating parser');
};

IofXmlParser.prototype.parse = function(xml) {
	xml2js.parseString(xml, function(error, result) {
		console.dir(result);
	});
};

module.exports = IofXmlParser;