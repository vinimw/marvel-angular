//MAIN
var app = angular.module('marvel', [
	'ngRoute', 
	'ngResource', 
	'ngMd5',
	'infinite-scroll',

	'constants.app',

	'directives.search',

	'controllers.characters',
	'controllers.character-detail',

	'services.characters',
	'services.hash',
	'services.character-detail'

]);
//CONSTANTS
var app = angular.module('constants.app', []);

app.constant('API',{
	'APIKEY': '59a9759ea50a128e8d3b21db3f921f81',
	'PRIVATEKEY': '2917629d37be1c10305731b60e7d8018a8e2fa10',
	'URL': 'https://gateway.marvel.com:443/v1/public/',
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
		templateUrl: 'partials/detail.html',
		controller: 'CharacterDetail'
	});

	$routeProvider.otherwise({
		redirectTo: '/characters'
	});

});
var app = angular.module('controllers.character-detail', []);

app.controller('CharacterDetail', function($scope, $http, API, CharacterDetailService) {

	$scope.character = [];

	$scope.character = CharacterDetailService.getCharacter('1017100');
	console.log($scope.character);
	//Get character

});
var app = angular.module('controllers.characters', []);

app.controller('Characters', function($scope, $http, API, md5, CharactersService) {

	$scope.characters = [];
	$scope.changeCharacter = '';

	var vm = $scope;

	vm.params = {
	    "isLoading": false,
	    "after": 0,
	    "limit": 8,
	    "name": ''
	};

	vm.getCharacters = function () {

		if (vm.params.isLoading) {
			return;
		}

	    vm.params.isLoading = true;

	    CharactersService.getCharacter(vm.params.name,vm.params.after,vm.params.limit).then(
	        function (res) {
	        	angular.forEach(res.characters, function(character, key) {
	        		$scope.characters.push(character);
	        	});
	        	vm.params.after = res.offset + res.count;
	            vm.params.isLoading = false;

	        }, function (err) {
	            console.error('Error getting settings');
	            console.error(err);
	            vm.params.isLoading = false;
	        }
	    );
	};

	vm.getCharacters();


	$scope.$watch('changeCharacter', function(newValue, oldValue) {
		vm.params.name = newValue;
		vm.params.after = 0;
		$scope.characters = [];
		vm.getCharacters();
	}, true);

});
var app = angular.module('directives.search', []);

app.directive('fieldCharacterSearch', function() {

	return {
		restrict: 'A',
		scope: {
			changeCharacter: '='
		},
		link: function(scope, element, attrs) {
			scope.$watch('changeCharacter', function(newValue, oldValue) {
				console.log("asdasd");
				if (newValue)
					console.log("I see a data change!");
			}, true);
		}
	}
});
var app = angular.module('services.character-detail', []);

app.service('CharacterDetailService', function ($q, $http, API, HashService) {

	var self = {

		'getCharacter': function (idCharacter) {
			var character = [];
			var url = API.URL + 'characters/' + idCharacter + '?apikey=' + API.APIKEY;
			$http({
				method: 'GET',
				url: url
			}).then(function (success){
				var characters = [];
				var result = success.data.data.results;
				angular.forEach(result, function(character, key) {
					character.photo = character.thumbnail.path + '/standard_fantastic.' + character.thumbnail.extension;
					characters.push(character);
				});

				character = characters[0];

				return character;


			// character.photo = character.thumbnail.path + '/standard_fantastic.' + character.thumbnail.extension;

			},function (error){
				console.log(error);
				return;
			});
		}
	};

	return self;
});

var app = angular.module('services.characters', []);

app.service('CharactersService', function ($q, $http, API, HashService) {
	
	var self = {

		'getCharacter': function (name,offset,limit) {
			
			return $q(function(resolve, reject) {
				var nameSearch = '';
				if (name != '') {
					nameSearch = 'nameStartsWith=' + name + '&';
				}
				var url = API.URL + 'characters?' + nameSearch + 'offset=' + offset + '&limit=' + limit + '&apikey=' + API.APIKEY;
				$http({
					method: 'GET',
					url: url
				}).then(function (success){
					var characters = [];
					var data = [];
					var result = success.data.data.results;
					data = success.data.data;
					angular.forEach(result, function(character, key) {
						character.photo = character.thumbnail.path + '/standard_fantastic.' + character.thumbnail.extension;
						characters.push(character);
					});

					data.characters = characters;

					resolve(data);

				},function (error){
					reject(error);
				});
			});
			
		}
	};

	return self;


	return Characters;
});

var app = angular.module('services.hash', []);

app.service('HashService', function (API, md5) {

	var self = {

        'getHash': function () {
            return md5.createHash(API.TS+API.PRIVATEKEY+API.APIKEY);
        }
    };

    return self;
});
