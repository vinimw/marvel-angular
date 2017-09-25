var app = angular.module('services.character-detail', []);

app.service('CharacterDetailService', function ($http, API, HashService) {

	var self = {

		'getCharacter': function (idCharacter) {
			var character = [];
			var url = API.URL + 'characters/' + idCharacter + '?apikey=' + API.APIKEY;
			$http({
				method: 'GET',
				url: url
			}).then(function (success){
				var characters = [];
				var result = success.data.data.results;
				angular.forEach(result, function(character, key) {
					character.photo = character.thumbnail.path + '/standard_fantastic.' + character.thumbnail.extension;
					characters.push(character);
				});

				character = characters[0];

				return character;


			// character.photo = character.thumbnail.path + '/standard_fantastic.' + character.thumbnail.extension;

			},function (error){
				console.log(error);
				return;
			});
		}
	};

	return self;
});
