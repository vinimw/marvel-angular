app.config(function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	//routes
	$routeProvider.when('/characters', {
		templateUrl: 'partials/home.html',
		controller: 'Characters'
	});

	$routeProvider.when('/characters/:idCharacter', {
		templateUrl: 'partials/detail.html',
		controller: 'CharacterDetail'
	});

	$routeProvider.otherwise({
		redirectTo: '/characters'
	});

});