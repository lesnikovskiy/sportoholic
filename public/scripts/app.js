var sportoholic = angular.module('sportoholic', ['ngRoute', 'sportControllers', 'ui.bootstrap']);

sportoholic.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/results', {templateUrl: '/partials/results.html', controller: 'resultsController'})
        .otherwise({redirectTo: '/'});
}]);
