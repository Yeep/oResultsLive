define(['angularAMD', 'angular-route', 'angular-resource', 'view-directives'], function(angularAMD) {
	var app = angular.module('webapp', ['ngRoute', 'ngResource', 'view-directives']);
	app.config(function($routeProvider) {
		$routeProvider
			.when('/events', angularAMD.route({
				templateUrl: 'views/events.html', 
				controller: 'EventsCtrl',
				controllerUrl: 'controllers/events'
			}))
			.when('/events/:id', angularAMD.route({
				templateUrl: 'views/event.html',
				controller: 'EventCtrl',
				controllerUrl: 'controllers/event'
			}))
			.when('/events/:eventId/screens/:screenId', angularAMD.route({
				templateUrl: 'views/screen.html',
				controller: 'ScreenCtrl',
				controllerUrl: 'controllers/screen'
			}))
			.otherwise({
				redirectTo: "/events"
			});
	});
	return angularAMD.bootstrap(app);
});