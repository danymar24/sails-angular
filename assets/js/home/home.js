'use strict';

/**
 * Home module
 * 
 * This module contains the routes and controller for the
 * homepage, you can take this module as example to create
 * another modules.
 * 
 */

angular.module('sails-angular.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'js/home/home.html',
    controller: 'HomeController'
  });
}])

.controller('HomeController', function ($scope) {
	$scope.features = [
			{
				'title': 'Sails.Js',
				'image': '/images/Sailsjs.png',
				'info': 'Using the latest stable version of Sails.js',
				'ver': 'v0.11.0',
			},
			{
				'title': 'Angular.Js',
				'image': '/images/AngularJS.png',
				'info': 'Using the latest stable version of AngularJS',
				'ver': 'v1.3.13',
			},
			{
				'title': 'Bootstrap 3',
				'image': '/images/bootstrap.png',
				'info': 'Using the latest stable version of Bootstrap',
				'ver': 'v3.3.2',
			},
			{
				'title': 'Buit in Rest API',
				'info': 'Built in simple CRUD to start developing',
			}
		]
});