//MAIN
var app = angular.module('marvel', [
	'ngRoute', 
	'ngResource', 
	'ngMd5',
	'infinite-scroll',

	'constants.app',

	'controllers.characters',

	'services.characters'


]);
//CONSTANTS
var app = angular.module('constants.app', []);

app.constant('API',{
	'APIKEY': '59a9759ea50a128e8d3b21db3f921f81',
	'PRIVATEKEY': '2917629d37be1c10305731b60e7d8018a8e2fa10',
	'URL': 'http://gateway.marvel.com/v1/public/',
	'LIMIT': 9,
	'TS': Date.now(),
});

app.config(function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	//routes
	$routeProvider.when('/characters', {
		templateUrl: 'partials/home.html',
		controller: 'Characters'
	});

	$routeProvider.when('/characters/:idCharacter', {
		templateUrl: 'partials/detail.html'
	});

	$routeProvider.otherwise({
		redirectTo: '/characters'
	});

});
var app = angular.module('controllers.characters', []);

app.controller('Characters', function($scope, $http, API, md5, CharactersService) {

	$scope.characters = [];

	//Get characters
	
	$scope.characters = new CharactersService();

});
var app = angular.module('services.characters', []);

app.service('CharactersService', function ($http, API, md5) {

	var Characters = function() {
		this.items = [];
		this.busy = false;
		this.after = 0;
		this.limit = 6;
	};

	Characters.prototype.getCharacters = function() {
		if (this.busy) return;
		this.busy = true;

		$http({
			method: 'GET',
			url: API.URL + 'characters?offset=' + this.after + '&limit=' + this.limit + '&ts=' + API.TS + '&apikey=' + API.APIKEY + '&hash=' + md5.createHash(API.TS+API.PRIVATEKEY+API.APIKEY)
		}).then(function (success){

			var result = success.data.data.results;
			var characters = this.items;

			angular.forEach(result, function(character, key) {
				character.photo = character.thumbnail.path + '/standard_fantastic.' + character.thumbnail.extension;
				characters.push(character);
			});

			this.items = characters;
			this.after = success.data.data.offset + success.data.data.limit;
			this.busy = false;

		}.bind(this),function (error){
			this.busy = false;
			console.log(error);
		}.bind(this));
	};

	return Characters;
});
