var vControllers = angular.module('vControllers', []);

vControllers.controller('listController', ['$scope', '$window', '$http', '$location', function ($scope, $window, $http, $location) {
	$scope.entries = [];
	
	var skip = 0;
	var take = 10;
	
	function getEntries(skipArg, takeArg) {
	debugger;
		$http.get('/apis/vocabulary/' + skipArg + '/' + takeArg)
			.success(function (data) {
				$scope.entries = data;
			}).error(function (data) {
				alert(data);
			});
	}
	
	getEntries(0, 10);
	
	$scope.newer = function () {
		skip = skip - take > 0 ? 0 : skip;
		getEntries(skip, take);
	};
	
	$scope.older = function () {
		skip += take;
		getEntries(skip, take);
	};
		
	$scope.remove = function (_id) {
		$http({
				method: 'DELETE',
				url: '/apis/vocabulary/' + _id
			}).success(function (data) {
				$(location).path('/');
			}).error(function(data) {
				$(location).path('/');
			});
	};
}]);

vControllers.controller('newController', ['$scope', '$window', '$http', '$location', function ($scope, $window, $http, $location) {
	$scope.entry = {
		word: '',
		translation: ''
	};	
		
	$scope.saveWord = function() {
		$http.post('/apis/vocabulary', $scope.entry)
			.success(function (data) {				
				$location.path('/');
			})
			.error(function (data) {
				alert(data);
			});
	};
}]);

vControllers.controller('learnController', ['$scope', '$window', '$http', '$location', function ($scope, $window, $http, $location) {
	$scope.words = [];
}]);