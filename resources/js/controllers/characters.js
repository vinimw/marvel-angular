var app = angular.module('controllers.characters', []);

app.controller('Characters', function($scope, $http, API, md5, CharactersService) {

	$scope.characters = [];

	//Get characters
	
	$scope.characters = new CharactersService();

});