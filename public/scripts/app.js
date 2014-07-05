var sportoholic = angular.module('sportoholic', ['ngRoute', 'sportControllers']);

sportoholic.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/calendar', {templateUrl: '/partials/calendar.html', controller: 'calendarController'})
        .when('/results', {templateUrl: '/partials/results.html', controller: 'resultsController'})
        .otherwise({redirectTo: '/'});
}]);
