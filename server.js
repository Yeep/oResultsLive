var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

var IofXmlParser = require("./IofXmlParser");

var Events = require("./app/models/Events");
var events = new Events();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8888;

var router = express.Router();

router.get('/', function(request, response) {
	reponse.json({
		message: 'Welcome'
	});
});

router.route('/events')

	.get(function(request, response) {
		response.json(events.list());
		/*response.json({
			message: 'events!'
		});*/
	});

router.route('/events/:event_id')

	.get(function(request, response) {
		response.json(events.byId(request.params.event_id));
	});

router.route('/events/:event_id/results')

	.get(function(request, response) {
		response.json(events.getResults(request.params.event_id));
	});

router.route('/events/:event_id/classes')

	.get(function(request, response) {
		response.json(events.getClasses(request.params.event_id));
	});
	
router.route('/events/:event_id/classes/:class_id/results')

	.get(function(request, response) {
		response.json(events.byId(request.params.event_id).parser.resultsForClass(request.params.class_id));
	});
	
router.route('/events/:event_id/classes/:class_id')

	.get(function(request, response) {
	
	});

app.use('/api', router);

app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/bower_components'));

app.listen(port);
console.log('Listening on port ' + port);