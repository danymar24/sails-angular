'use strict';

/**
 * Sails Angular app
 *
 *	This is the main angular app, this app injects the
 *	necesary modules to make the app work.
 * 
 */

angular.module('sails-angular', [
  'ngRoute',
  'sails-angular.home',
  'sails-angular.crud'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
