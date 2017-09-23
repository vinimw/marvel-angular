angular.module('marvel').controller('HomeController', function($scope, $http, API, md5) {

	$scope.characters = [];
	$scope.pagination = {};
	$scope.getNumber = function(num) {
		return new Array(num);   
	}

	//Get characters
	
	$http({
		method: 'GET',
		url: 'http://gateway.marvel.com/v1/public/characters?offset=0&limit=' + API.LIMIT + '&ts=' + API.TS + '&apikey=' + API.APIKEY + '&hash=' + md5.createHash(API.TS+API.PRIVATEKEY+API.APIKEY)
	}).then(function (success){
		$scope.characters = success.data.data.results;
		$scope.pagination = {
			total: success.data.data.total,
			limit: success.data.data.limit,
			count: success.data.data.count,
			totalPages: success.data.data.total / API.LIMIT,
		}

		console.log($scope.pagination);
		console.log(success.data.data);
	},function (error){
		console.log(error);
	});


});