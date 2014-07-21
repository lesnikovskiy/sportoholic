var sportoholic = angular.module('sportoholic', ['ngRoute', 'sportControllers', 'ui.bootstrap']);

sportoholic.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
		.when('/', {templateUrl: '/partials/list.html', controller: 'listController'})
		.when('/edit/', {templateUrl: '/partials/edit.html', controller: 'editController'})
        .when('/edit/:id', {templateUrl: '/partials/edit.html', controller: 'editController'})
		.when('/register', {templateUrl: '/partials/register.html', controller: 'registerController'})
		.when('/login', {templateUrl: '/partials/login.html', controller: 'loginController'})
        .otherwise({redirectTo: '/'});
}]);
