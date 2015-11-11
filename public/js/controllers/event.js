define(['app'], function(app) {
	app.controller('EventCtrl', ["$scope", "$resource", "$routeParams", function($scope, $resource, $routeParams) {
		var Events = $resource('/api/events/:id');
		
		$scope.event = Events.get({id: $routeParams.id});
	}]);
});