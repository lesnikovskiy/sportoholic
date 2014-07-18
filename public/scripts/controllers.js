var sportControllers = angular.module('sportControllers', []);

sportControllers.controller('listController', ['$scope', '$window', '$location', '$http', 
    function ($scope, $window, $location, $http) {
		$scope.results = [];
		
		$http.get('/api/result')
			.success(function (data) {
				$scope.results = data;
			})
			.error(function (data) {
				console.log(data);
			});
	}
]);

sportControllers.controller('editController', ['$scope', '$window', '$location', '$http', '$routeParams',
    function ($scope, $window, $location, $http, $routeParams) {			
		$scope.result = {};
		$scope.alert = {};
		$scope.alert.visibility = false;
		
		if ($routeParams.id) {
			$http.get('/api/result/' + $routeParams.id)
				.success(function (data) {
					$scope.result = data;
				})
				.error(function (data) {
					$scope.alert.visibility = true;
					$scope.alert.type = 'danger';
					$scope.alert.message = JSON.stringify(data);
				});
		} else {
			$scope.result.morningWeight = 0;
			$scope.result.nightWeight = 0;
			$scope.result.sugar = false;
			$scope.result.lateEating = false;
			$scope.result.morningFitness = false;
			$scope.result.nightFitness = false;
			$scope.result.walking = false;
			$scope.result.notes = '';
		}
		
        // Datepicker settings
        $scope.today = function() {
            $scope.result.date = new Date();            
        };
        
        $scope.today();

        $scope.clear = function () {
            $scope.result.date = null;
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.initDate = new Date('2016-15-20');
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[2];
				
		$scope.submitResult = function () {
			$http.post('/api/result', $scope.result)
				.success(function (data) {
					$scope.alert.visibility = true;
					$scope.alert.type = 'danger';
					$scope.alert.message = 'Results successfully saved.'
					$location.path('#/list');
				})
				.error(function (data) {
					$scope.alert.visibility = true;
					$scope.alert.type = 'danger';
					$scope.alert.message = JSON.stringify(data);
				});
		};
    }
]);