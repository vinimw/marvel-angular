var app = angular.module('controllers.characters', []);

app.controller('Characters', function($scope, $http, API, md5, CharactersService) {

	$scope.characters = [];
	$scope.changeCharacter = '';

	//Get characters
	
	$scope.characters = new CharactersService();

	$scope.$watch('changeCharacter', function(newValue, oldValue) {
		$scope.changeCharacter = newValue;
	}, true);

});