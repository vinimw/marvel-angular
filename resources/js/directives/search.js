var app = angular.module('directives.search', []);

app.directive('fieldCharacterSearch', function() {

	return {
		restrict: 'A',
		scope: {
			changeCharacter: '='
		},
		link: function(scope, element, attrs) {
			scope.$watch('changeCharacter', function(newValue, oldValue) {
				console.log("asdasd");
				if (newValue)
					console.log("I see a data change!");
			}, true);
		}
	}
});