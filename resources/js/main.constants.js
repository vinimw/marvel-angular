//CONSTANTS
var app = angular.module('constants.app', []);

app.constant('API',{
	'APIKEY': '59a9759ea50a128e8d3b21db3f921f81',
	'PRIVATEKEY': '2917629d37be1c10305731b60e7d8018a8e2fa10',
	'URL': 'https://gateway.marvel.com:443/v1/public/',
	'LIMIT': 9,
	'TS': Date.now(),
});
