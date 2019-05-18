'use strict';
var config = {
headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
};
var acentos = {
	headers : {"Content-Type": "text/html;charset=utf-8"}
}

angular.module('myAppInvestigador')
  .factory('TareasResource', function($http) {
    var servicio = {	
			prInvestigador: function(datos) {
				return $http.post('service/prInvestigador.php', datos);  
			},
			prIniciar : function(datos) {
				return $http.post('service/prIniciar.php', datos);  
			}
		}
    return servicio;
});