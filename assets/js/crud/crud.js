'use strict';

/**
 *  CRUD Module
 *
 * 	This module contains the routes, service, and controllers
 * 	with the CRUD actions.
 * 
 */

angular.module('sails-angular.crud', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/crud', {
    templateUrl: 'js/crud/read.html',
    controller: 'ReadController'
  });
  $routeProvider.when('/crud/read/:id', {
  	templateUrl: 'js/crud/readOne.html',
  	controller: 'ReadOneController'
  });
  $routeProvider.when('/crud/create', {
  	templateUrl: 'js/crud/create.html',
  	controller: 'CreateController'
  });
  $routeProvider.when('/crud/update/:id', {
  	templateUrl: 'js/crud/update.html',
  	controller: 'UpdateController'
  });
  $routeProvider.when('/crud/delete/:id', {
  	templateUrl: 'js/crud/delete.html',
  	controller: 'DeleteController'
  });
}])

.factory('CrudService', function ($resource){
	return $resource('/crud/:id', {id: '@id'}, {
		'update': {method: 'PUT'}
	});
})

.controller('CreateController', function ($scope, $location, CrudService) {
	$scope.createEntry = function (){
		CrudService.save($scope.createData, function(){
			$location.path('/crud/');
		});
		
	}
})

.controller('ReadController', function ($scope, CrudService) {
	CrudService.query(function (data){
		$scope.entries = data;
	});

	$scope.delete = function (DeleteId){
		CrudService.delete({ id: DeleteId });
	};
})

.controller('ReadOneController', function ($scope, CrudService, $routeParams) {
	CrudService.get({ id: $routeParams.id }, function (data){
		$scope.entry = data;
	});

	$scope.delete = function (DeleteId){
		CrudService.delete({ id: DeleteId });
	};
})

.controller('UpdateController', function ($scope, $location, CrudService, $routeParams) {
	$scope.updateEntry = function (){
		CrudService.update({ id: $routeParams.id }, $scope.updateData, function(response){
			$location.path('/crud/read/' + response.id);
		});
	}
})

.controller('DeleteController', function ($scope, $location, CrudService, $routeParams) {
	CrudService.delete({ id: $routeParams.id }, function(){
		$location.path('/crud/');
	});
	
})
