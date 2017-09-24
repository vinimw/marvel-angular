app.config(function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	//routes
	$routeProvider.when('/characters', {
		templateUrl: 'partials/home.html',
		controller: 'HomeController'
	});

	$routeProvider.when('/characters/:idCharacter', {
		templateUrl: 'partials/detail.html'
	});

	$routeProvider.otherwise({
		redirectTo: '/characters'
	});

});