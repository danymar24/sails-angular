'use strict';

/**
 * Sails Angular app
 *
 *	This is the main angular app, this app injects the
 *	necesary modules to make the app work.
 * 
 */

angular.module('sails-angular', [
  'ui.router', 
  'ngResource',
  'sails-angular.home',
  'sails-angular.crud'
])

.config(['$urlRouterProvider', function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
}]);
