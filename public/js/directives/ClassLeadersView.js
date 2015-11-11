define(['angularAMD'], function(angularAMD) {
	angularAMD.directive('ClassLeadersView', function() {
		console.log("Aaaaaaaaaaaaaa!");
		return {
			scope: {},
			bindToController: {
				//message: '='
			},
			controller: function() {},
			controllerAs: 'ctrl',
			template: '<h3>Message: {{ctrl.message}}</h3>' //Url: 'views/ClassLeadersView.html'
		};
	});
});