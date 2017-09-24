//MAIN
var app = angular.module('marvel', [
	'ngRoute', 
	'ngResource', 
	'ngMd5',
	'infinite-scroll',

	'constants.app',

	'controllers.characters',

	'services.characters'


]);