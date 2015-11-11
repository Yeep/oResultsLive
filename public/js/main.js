require.config({
	baseUrl: '/js',
	paths: {
		'angular': '/scripts/angular/angular',
		'angular-route': '/scripts/angular-route/angular-route',
		'angular-resource': '/scripts/angular-resource/angular-resource',
		'angularAMD': '/scripts/angularAMD/angularAMD',
		'underscore': '/scripts/underscore/underscore',
		'jquery': '/scripts/jquery/dist/jquery',
		'view-directives': '/js/directives/views'
	},
	shim: { 
		'angularAMD': ['angular'], 
		'angular-route': ['angular'], 
		'angular-resource': ['angular'],
		'view-directives': ['angular', 'angularAMD']
	},
	deps: ['app']
});