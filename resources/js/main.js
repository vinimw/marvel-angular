//MAIN
var app = angular.module('marvel', [
	'ngRoute', 
	'ngResource', 
	'ngMd5',
	'infinite-scroll',
	'ngProgress',

	'constants.app',

	'directives.search',

	'controllers.characters',
	'controllers.character-detail',

	'services.characters',
	'services.hash',
	'services.character-detail',
	'services.comics'

]);