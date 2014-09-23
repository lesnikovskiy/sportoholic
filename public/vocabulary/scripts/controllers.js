var vControllers = angular.module('vControllers', []);

vControllers.controller('listController', ['$scope', '$window', '$http', '$location', function ($scope, $window, $http, $location) {
	$scope.words = [];
}]);