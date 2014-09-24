var vocabulary = angular.module('vocabulary', ['ngRoute', 'vControllers']);

vocabulary.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
		.when('/', {templateUrl: '/vocabulary/templates/list.html', controller: 'listController'})        
		.when('/new', {templateUrl: '/vocabulary/templates/new.html', controller: 'newController'})  
		.when('/learn', {templateUrl: '/vocabulary/templates/learn.html', controller: 'learnController'})  
        .otherwise({redirectTo: '/'});
}]);