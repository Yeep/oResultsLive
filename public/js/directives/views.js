define([], function() {
	var module = angular.module('view-directives', []);
	
	module.directive('viewGenerator', ["$compile", function($compile) {
		return {
			restrict: "E",
			scope: {
				event: '=',
				view: '=',
				config: '='
			},
			link: function(scope, element) {
				var generatedTemplate = '<' + scope.view + ' config="config" event="event"></' + scope.viewType + '>';
				element.append($compile(generatedTemplate)(scope));
			}
		}
	}]);
	
	module.directive('classLeadersView', function() {
		return {
			restrict: "E",
			bindToController: true,
			scope: {
				event: '=',
				config: '='
			},
			controller: function() {
			},
			controllerAs: 'ctrl',
			templateUrl: 'views/ClassLeadersView.html'
		};
	});
	
	module.directive('classResultsView', function() {
		return {
			restrict: "E",
			bindToController: true,
			scope: {
				event: '=',
				config: '='
			},
			controller: function($scope, $resource) {
				var Results = $resource('/api/events/:event_id/classes/:class_id/results');
				
				$scope.results = Results.get({
					event_id: this.event.id,
					class_id: this.config.class.id
				});
			
				$scope.class = this.config.class;
				
				$scope.positionClass = function(position) {
					return 'position' + position;
				};
				$scope.fullName = function(person) {
					return person.givenName + ' ' + person.familyName;
				};
				$scope.toTime = function(seconds) {
					if (seconds != null) {
						var sec_num = parseFloat(seconds);
						var hours   = Math.floor(sec_num / 3600);
						var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
						var seconds = sec_num - (hours * 3600) - (minutes * 60);

						if (hours   < 10) {hours   = "0"+hours;}
						if (minutes < 10) {minutes = "0"+minutes;}
						if (seconds < 10) {seconds = "0"+seconds;}
						var time    = hours+':'+minutes+':'+seconds;
						return time;
					}
					return null;
				}
			},
			controllerAs: 'ctrl',
			templateUrl: 'views/ClassResultsView.html'
		};
	});
	
	return module;
});