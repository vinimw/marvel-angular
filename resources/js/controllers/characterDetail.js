var app = angular.module('controllers.character-detail', []);

app.controller('CharacterDetail', function($scope, $http, API, CharacterDetailService, ComicsService, $routeParams, ngProgressFactory) {

	$scope.character = [];
	$scope.comics = [];
	$scope.characterId = $routeParams.idCharacter;
	$scope.buttons = {
		"comic": {
			"prev": 'enabled',
			"next": 'enabled'
		}
	};

	var params = {
		"limit": 8,
		"offset": 0,
		"total": false,
		"waiting": false
	};

	//start character progressbar
	$scope.progressbar = ngProgressFactory.createInstance();
	$scope.progressbar.setParent(document.getElementById('progressbar'));
	$scope.progressbar.setHeight('5px');
	$scope.progressbar.setColor('#006980');
	$scope.progressbar.start();
		
	vm = $scope;

	vm.getCharacter = function(characterId){

		// console.log($scope.character);
		CharacterDetailService.getCharacter(characterId)
		.then(function(data){
			// console.log(data);
			$scope.character.description = data.description;
			$scope.character.title = data.name;
			$scope.character.photo = data.photo;
			$scope.progressbar.complete();
		}, function(error){
			console.log(error);
		});

		return;
	};

	$scope.progressComics = ngProgressFactory.createInstance();
	$scope.progressComics.setParent(document.getElementById('progressComic'));
	$scope.progressComics.setHeight('5px');
	$scope.progressComics.setColor('#006980');

	vm.getComics = function(action) {

		if(params.waiting) {
			return;
		}

		$scope.progressComics.start();

		params.waiting = true;

		if (action == 'next') {
			params.offset = params.offset + params.limit;
		}

		if (action == 'prev') {
			params.offset = params.offset - params.limit;
		}

		vm.nextButton();

		if(params.offset < 1) {
			$scope.buttons.comic.prev = 'disabled';
		} else {
			$scope.buttons.comic.prev = 'enabled';
		}

		ComicsService.getComics($scope.characterId,params.limit,params.offset)
		.then(function(data){
			$scope.comics = [];
			$scope.comics = data;
			$scope.progressComics.complete();
			params.total = data.data.total;
			vm.nextButton();
			params.waiting = false;
		}, function(error){
			console.log(error);
			params.waiting = false;
		});

		return;
	}

	vm.nextButton = function() {
		if ( ((params.total) && params.total <= (params.offset + params.limit)) || params.total === 0) {
			$scope.buttons.comic.next = 'disabled';
		} else {
			$scope.buttons.comic.next = 'enabled';
		}
	}

	vm.getCharacter($scope.characterId);
	vm.getComics();

});