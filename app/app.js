
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

.directive('datepicker', function() {
  return {
     restrict: 'A',
     require: 'ngModel',
     compile: function() {
        return {
           pre: function(scope, element, attrs, ngModelCtrl) {
              var format, dateObj;
              format = (!attrs.dpFormat) ? 'd/m/yyyy' : attrs.dpFormat;
              if (!attrs.initDate && !attrs.dpFormat) {
                 // If there is no initDate attribute than we will get todays date as the default
                 dateObj = new Date();
                 scope[attrs.ngModel] = dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();
              } else if (!attrs.initDate) {
                 // Otherwise set as the init date
                 scope[attrs.ngModel] = attrs.initDate;
              } else {
                 // I could put some complex logic that changes the order of the date string I
                 // create from the dateObj based on the format, but I'll leave that for now
                 // Or I could switch case and limit the types of formats...
              }
              // Initialize the date-picker
              $(element).datepicker({
                 format: format,
              }).on('changeDate', function(ev) {
                 // To me this looks cleaner than adding $apply(); after everything.
                 scope.$apply(function () {
                    ngModelCtrl.$setViewValue(ev.format(format));
                 });
              });
           }
        }
     }
  }
});