var sportoholic = angular.module('sportoholic', ['ngRoute', 'sportControllers', 'ui.bootstrap', 'ui.calendar']);

sportoholic.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
		.when('/', {templateUrl: '/partials/table.html', controller: 'tableController'})
		.when('/calendar', {templateUrl: '/partials/calendar.html', controller: 'calendarController'})
		.when('/results/', {templateUrl: '/partials/results.html', controller: 'resultsController'})
        .when('/results/:id', {templateUrl: '/partials/results.html', controller: 'resultsController'})
        .otherwise({redirectTo: '/'});
}]);
