var app = angular.module('services.characters', []);

app.service('CharactersService', function ($http, API, md5) {

	var Characters = function() {
		this.items = [];
		this.busy = false;
		this.after = 0;
		this.limit = 6;
	};

	Characters.prototype.getCharacters = function() {
		if (this.busy) return;
		this.busy = true;

		$http({
			method: 'GET',
			url: API.URL + 'characters?offset=' + this.after + '&limit=' + this.limit + '&ts=' + API.TS + '&apikey=' + API.APIKEY + '&hash=' + md5.createHash(API.TS+API.PRIVATEKEY+API.APIKEY)
		}).then(function (success){

			var result = success.data.data.results;
			var characters = this.items;

			angular.forEach(result, function(character, key) {
				character.photo = character.thumbnail.path + '/standard_fantastic.' + character.thumbnail.extension;
				characters.push(character);
			});

			this.items = characters;
			this.after = success.data.data.offset + success.data.data.limit;
			this.busy = false;

		}.bind(this),function (error){
			this.busy = false;
			console.log(error);
		}.bind(this));
	};

	return Characters;
});
