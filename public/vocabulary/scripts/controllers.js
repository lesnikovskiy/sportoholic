var vControllers = angular.module('vControllers', []);

vControllers.controller('listController', ['$scope', '$window', '$http', '$location', function ($scope, $window, $http, $location) {
	$scope.entries = [];
	
	$http.get('/apis/vocabulary')
		.success(function (data) {
			$scope.entries = data;
		})
		.error(function (data) {
			alert(data);
		});
		
	$scope.remove = function (_id) {
		$http({
				method: 'DELETE',
				url: '/apis/vocabulary/' + _id
			}).success(function (data) {
				$(location).path('/');
			}).error(function(data) {
				alert('Error: ' + data);
			});
	};
}]);

vControllers.controller('newController', ['$scope', '$window', '$http', '$location', function ($scope, $window, $http, $location) {
	$scope.entry = {
		word: '',
		translation: ''
	};
		
	$scope.saveWord = function() {
		$http.post('/apis/vocabulary/', $scope.entry)
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