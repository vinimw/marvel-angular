var app = angular.module('controllers.character-detail', []);

app.controller('CharacterDetail', function($scope, $http, API, CharacterDetailService, $routeParams) {

	$scope.character = [];
	$scope.characterId = $routeParams.idCharacter;
		
	vm = this;

	vm.getCharacter = function(characterId){

		// console.log($scope.character);
		CharacterDetailService.getCharacter(characterId)
		.then(function(data){
			console.log(data);
			$scope.character.description = data.description;
			$scope.character.title = data.name;
			$scope.character.photo = data.photo;
		}, function(error){
			console.log(error);
		});

		return;
	};

	vm.getCharacter($scope.characterId);

});