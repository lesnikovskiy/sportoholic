var sportControllers = angular.module('sportControllers', ['ui.bootstrap.buttons']);

sportControllers.controller('tableController', ['$scope', '$window', '$location', '$http', 
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

sportControllers.controller('resultsController', ['$scope', '$window', '$location', '$http', '$routeParams',
    function ($scope, $window, $location, $http, $routeParams) {    
		function getDateMarker(date) {
			if (!date && date.constructor !== Date)
				return '';
		
			var day = date.getDate();
			var month = date.getMonth();
			var year = date.getFullYear();
			
			return day + '-' + month + '-' + year;
		}
	
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
			console.log('today triggered');
            $scope.result.date = new Date();
			$scope.result.dateMarker = getDateMarker($scope.result.date);
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
        $scope.format = 'dd.MM.yyyy';
				
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

sportControllers.controller('calendarController', ['$scope', '$window', '$location', '$http', 
    function ($scope, $window, $location, $http) {
	/*
		$scope.eventSource = {
			url: "/api/result"
		};*/	
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		
		$scope.events = [
			{title: 'All day event', start: new Date(y, m, 1), allDay: true}
		];
		
/*		
		$scope.remove = function (index) {
			$scope.events.splice(index, 1);
		};*/
		
		$http.get('/api/result')
			.success(function (data) {
				for (var i = 0; i < data.length; i++) {
					$scope.events.push({
						title: data[i].dateMarker,
						start: new Date(data[i].date),
						url: '#/results/' + data[i].dateMarker
					});
				}
			})
			.error(function (data) {
				console.log(data);
			});
				
		$scope.dayClick = function (date, allDay, jsEvent, view) {
			var marker = date.year() + '-' + date.month() + '-' + date.day();
			console.log(marker);
			$location.path('#/results/' + marker);
		};
			
        $scope.uiConfig = {
			calendar:{
				height: 450,
				editable: true,
				header:{
					left: 'month basicWeek basicDay agendaWeek agendaDay',
					center: 'title',
					right: 'today prev,next'
				},
				dayClick: function (date, allDay, jsEvent, view) {
					var marker = date.year() + '-' + date.month() + '-' + date.day();
					console.log(marker);
					$location.path('#/results/' + marker);
				},
				select: function (start, end, allDay, jsEvent) {
					$location.path('#/results');
				}
				//viewRender: $scope.renderView
			}	
		};
    }
]);