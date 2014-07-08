var sportControllers = angular.module('sportControllers', ['ui.bootstrap.buttons']);

sportControllers.controller('calendarController', ['$scope', '$window', '$location', '$http', 
    function ($scope, $window, $location, $http) {
        
    }
]);

sportControllers.controller('resultsController', ['$scope', '$window', '$location', '$http', 
    function ($scope, $window, $location, $http) {    
		$scope.result = {};
		$scope.alert = {};
		$scope.alert.visibility = false;
		
        // Datepicker settings
        $scope.today = function() {
            $scope.result.date = new Date();
        };
        
        $scope.today();

        $scope.clear = function () {
            $scope.result.date = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return (mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ));
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
		
		$scope.result.morningWeight = 0,
		$scope.result.nightWeight = 0,
		$scope.result.sugar = false,
		$scope.result.lateEating = false,
		$scope.result.morningFitness = false,
		$scope.result.nightFitness = false,
		$scope.result.notes = ''
		
		$scope.submitResult = function () {
			$http.post('/api/result', $scope.result)
				.success(function (data) {
					$scope.alert.visibility = true;
					$scope.alert.type = 'danger';
					$scope.alert.message = 'Results successfully saved.'
				})
				.error(function (data) {
					$scope.alert.visibility = true;
					$scope.alert.type = 'danger';
					$scope.alert.message = JSON.stringify(data);
				});
		};
    }
]);

