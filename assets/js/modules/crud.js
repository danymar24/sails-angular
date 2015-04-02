'use strict';

/**
 *  CRUD Module
 *
 * 	This module contains the routes, service, and controllers
 * 	with the CRUD actions.
 * 
 */

angular.module('sails-angular.crud', [])

.config(['$stateProvider', function ($stateProvider) {
  	$stateProvider
		.state('crud', {
			url: '/crud', 
			templateUrl: '/templates/crud/read.html',
			controller: 'ReadController'
		})
		.state('read', {
			url: '/crud/read/:id', 
			templateUrl: '/templates/crud/readOne.html',
			controller: 'ReadOneController'
		})
		.state('create', {
			url: '/crud/create', 
			templateUrl: '/templates/crud/create.html',
			controller: 'CreateController'
		})
		.state('update', {
			url: '/crud/update/:id', 
			templateUrl: '/templates/crud/update.html',
			controller: 'UpdateController'
		})
		.state('delete', {
			url: '/crud/delete/:id', 
			templateUrl: '/templates/crud/delete.html',
			controller: 'DeleteController'
		});
}])

.factory('CrudService', ['$resource', function ($resource){
	return $resource('/crud/:id', {id: '@id'}, {
		'update': {method: 'PUT'}
	});
}])

.controller('CreateController', ['$scope', '$state', 'CrudService', function ($scope, $state, CrudService) {
	$scope.createEntry = function (){
		CrudService.save($scope.createData, function(){
			$state.go('crud');
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

.controller('ReadOneController', ['$scope', 'CrudService', '$stateParams', function ($scope, CrudService, $stateParams) {
	CrudService.get({ id: $stateParams.id }, function (data){
		$scope.entry = data;
	});

	$scope.delete = function (DeleteId){
		CrudService.delete({ id: DeleteId });
	};
}])

.controller('UpdateController', ['$scope', '$state', 'CrudService', '$stateParams', function ($scope, $state, CrudService, $stateParams) {
	$scope.updateEntry = function (){
		CrudService.update({ id: $stateParams.id }, $scope.updateData, function(response){
			$state.go('read', {id: response.id});
		});
	}
}])

.controller('DeleteController', ['$scope', '$state', 'CrudService', '$stateParams', function ($scope, $state, CrudService, $stateParams) {
	CrudService.delete({ id: $stateParams.id }, function(){
		$state.go('crud');
	});
	
}])
