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