angular.module('marvel', ['ngRoute', 'ngResource', 'ngMd5'])
.config(function($routeProvider, $locationProvider) {

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

	// console.log(md5);

	// console.log("asdasd");
	// console.log(ngMd5.createHash("lala"));

})

//CONSTANTS
.constant('API',{
	'APIKEY': '59a9759ea50a128e8d3b21db3f921f81',
	'PRIVATEKEY': '2917629d37be1c10305731b60e7d8018a8e2fa10',
	'LIMIT': 21,
	'TS': Date.now(),
});