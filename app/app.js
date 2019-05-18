
'use strict';
 
angular.module('myAppInvestigador', ['ngRoute','ngResource'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/investigador', {
        templateUrl: 'investigador/investigador.html',
        controller: 'InvestigadorController'
        
    }).when('/inicio', {
        templateUrl: 'inicio/inicio.html',
        controller: 'InicioController'        
    }).otherwise({
      redirectTo: '/inicio'
  }); 
}])