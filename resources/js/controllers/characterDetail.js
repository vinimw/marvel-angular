var app = angular.module('controllers.character-detail', []);

app.controller('CharacterDetail', function($scope, $http, API, CharacterDetailService) {

	$scope.character = [];

	$scope.character = CharacterDetailService.getCharacter('1017100');
	console.log($scope.character);
	//Get character

});