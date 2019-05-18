
'use strict';
 
angular.module('myAppInvestigador', ['ngRoute','ngResource'])
 
// Declared route 
.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider)  {

  $locationProvider.hashPrefix('');
$routeProvider.when('/investigador', {
        templateUrl: 'investigador/edit-investigador.html',
        controller: 'InvestigadorController'
        
    }).when('/inicio', {
        templateUrl: 'inicio/inicio.html',
        controller: 'InicioController'        
    }).otherwise({
      redirectTo: '/inicio'
  }); 
}])