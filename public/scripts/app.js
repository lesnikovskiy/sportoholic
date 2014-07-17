var sportoholic = angular.module('sportoholic', ['ngRoute', 'sportControllers', 'ui.bootstrap']);

sportoholic.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
		.when('/', {templateUrl: '/partials/list.html', controller: 'listController'})
		.when('/edit/', {templateUrl: '/partials/edit.html', controller: 'editController'})
        .when('/edit/:id', {templateUrl: '/partials/edit.html', controller: 'editController'})
        .otherwise({redirectTo: '/'});
}]);
