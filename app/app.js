
'use strict';
 
angular.module('myAppInvestigador', ['ngRoute','ui.bootstrap','ngAnimate','ngResource','base64','jqwidgets'])
 
// Declared route 
.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider)  {

  $locationProvider.hashPrefix('');
	$routeProvider.when('/edit-investigador/:idInvestigador', {
        templateUrl: 'investigador/edit-investigador.html',
        controller: 'editInvestigador'
        
    }).when('/inicio', {
        templateUrl: 'inicio/inicio.html',
        controller: 'InicioController'        
    }).otherwise({
      redirectTo: '/inicio'
  }); 
}])