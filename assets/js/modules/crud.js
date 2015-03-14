'use strict';

/**
 *  CRUD Module
 *
 * 	This module contains the routes, service, and controllers
 * 	with the CRUD actions.
 * 
 */

angular.module('sails-angular.crud', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/crud', {
    templateUrl: '/templates/crud/read.html',
    controller: 'ReadController'
  });
  $routeProvider.when('/crud/read/:id', {
  	templateUrl: '/templates/crud/readOne.html',
  	controller: 'ReadOneController'
  });
  $routeProvider.when('/crud/create', {
  	templateUrl: '/templates/crud/create.html',
  	controller: 'CreateController'
  });
  $routeProvider.when('/crud/update/:id', {
  	templateUrl: '/templates/crud/update.html',
  	controller: 'UpdateController'
  });
  $routeProvider.when('/crud/delete/:id', {
  	templateUrl: '/templates/crud/delete.html',
  	controller: 'DeleteController'
  });
}])

.factory('CrudService', ['$resource', function ($resource){
	return $resource('/crud/:id', {id: '@id'}, {
		'update': {method: 'PUT'}
	});
}])

.controller('CreateController', ['$scope', '$location', 'CrudService', function ($scope, $location, CrudService) {
	$scope.createEntry = function (){
		CrudService.save($scope.createData, function(){
			$location.path('/crud/');
		});
		
	}
}])

.controller('ReadController', ['$scope', 'CrudService', function ($scope, CrudService) {
	CrudService.query(function (data){
		$scope.entries = data;
	});

	$scope.delete = function (DeleteId){
		CrudService.delete({ id: DeleteId });
	};
}])

.controller('ReadOneController', ['$scope', 'CrudService', '$routeParams', function ($scope, CrudService, $routeParams) {
	CrudService.get({ id: $routeParams.id }, function (data){
		$scope.entry = data;
	});

	$scope.delete = function (DeleteId){
		CrudService.delete({ id: DeleteId });
	};
}])

.controller('UpdateController', ['$scope', '$location', 'CrudService', '$routeParams', function ($scope, $location, CrudService, $routeParams) {
	$scope.updateEntry = function (){
		CrudService.update({ id: $routeParams.id }, $scope.updateData, function(response){
			$location.path('/crud/read/' + response.id);
		});
	}
}])

.controller('DeleteController', ['$scope', '$location', 'CrudService', '$routeParams', function ($scope, $location, CrudService, $routeParams) {
	CrudService.delete({ id: $routeParams.id }, function(){
		$location.path('/crud/');
	});
	
}])
