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