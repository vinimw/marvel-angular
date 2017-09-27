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
