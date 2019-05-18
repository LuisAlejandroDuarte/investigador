'use strict';
var config = {
headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
};
var acentos = {
	headers : {"Content-Type": "text/html;charset=utf-8"}
}

angular.module('myAppInvestigador')
  .factory('TareasResource', function($resource,$http) {
    var servicio = {	
			prInvestigador: function(datos) {
				return $http.post('prInvestigador.php', datos);  
			},
			prIniciar : function(datos) {
				return $http.post('prIniciar.php', datos);  
			}
		}
    return servicio;
});