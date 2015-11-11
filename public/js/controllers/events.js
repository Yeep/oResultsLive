define(['app'], function(app) {
	app.controller('EventsCtrl', ["$scope", "$resource", function($scope, $resource) {
		var Events = $resource('/api/events/:id');
		
		$scope.events = Events.query();
	}]);
});