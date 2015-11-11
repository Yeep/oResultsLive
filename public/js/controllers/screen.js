define(['app', 'view-directives'], function(app) {
	app.controller('ScreenCtrl', ["$scope", "$resource", "$routeParams", "$compile", function($scope, $resource, $routeParams, $compile) {
		var Events = $resource('/api/events/:id');
		
		$scope.event = Events.get({id: $routeParams.eventId}, function() {
			$scope.screen = $scope.event.screens.find(function(screen) {
				if (screen.id == $routeParams.screenId) {
					return true;
				}
				return false;
			});
		});
	}]);
});