var app = angular.module('services.comics', []);

app.service('ComicsService', function ($q, $http, API) {

	var self = {

		'getComics': function (idCharacter,limit,offset) {

			return $q(function(resolve, reject) {
				var comic = [];
				var url = API.URL + 'characters/' + idCharacter + '/comics?offset=' + offset + '&limit=' + limit + '&apikey=' + API.APIKEY;
				$http({
					method: 'GET',
					url: url
				}).then(function (success){
					var comics = [];
					var result = success.data.data.results;
					angular.forEach(result, function(comic, key) {
						comic.photo = comic.thumbnail.path + '/standard_fantastic.' + comic.thumbnail.extension;
						comics.push(comic);
					});

					comic.list = comics;
					comic.data = success.data.data;

					resolve(comic);

				},function (error){
					console.log(error);
					reject(error);
				});
			});
		}
	};

	return self;
});
