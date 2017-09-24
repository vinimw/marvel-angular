//MAIN
var app = angular.module('marvel', [
	'ngRoute', 
	'ngResource', 
	'ngMd5']
);
//CONSTANTS
app.constant('API',{
	'APIKEY': '59a9759ea50a128e8d3b21db3f921f81',
	'PRIVATEKEY': '2917629d37be1c10305731b60e7d8018a8e2fa10',
	'LIMIT': 9,
	'TS': Date.now(),
});
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
angular.module('marvel').controller('HomeController', function($scope, $http, API, md5) {

	$scope.characters = [];

	//Get characters
	
	$http({
		method: 'GET',
		url: 'http://gateway.marvel.com/v1/public/characters?offset=0&limit=' + API.LIMIT + '&ts=' + API.TS + '&apikey=' + API.APIKEY + '&hash=' + md5.createHash(API.TS+API.PRIVATEKEY+API.APIKEY)
	}).then(function (success){
		$scope.characters = success.data.data.results;
	},function (error){
		console.log(error);
	});


});