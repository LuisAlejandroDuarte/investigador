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
			},

		prProyecto: function(datos) {
			return $http.post('service/prProyecto.php', datos);  
			},
		prProductos: function(datos) {
			return $http.post('service/prProductos.php', datos);  
			},
		prProyectoProducto: function(datos) {
			return $http.post('service/prProyectoProducto.php', datos);  
			}	,
		prTipoDocumento: function(datos) {
				return $http.post('service/prTipoDocumento.php', datos);  
		},
		prTipoCargo: function(datos) {
			return $http.post('service/prTipoCargo.php', datos);  
		},
		prCentro: function(datos) {
			return $http.post('service/prCentro.php', datos);  
		},
		prProgramaAcademico: function(datos) {
			return $http.post('service/prProgramaAcademico.php', datos);  
		}	,
		prNivelFormacion: function(datos) {
			return $http.post('service/prNivelFormacion.php', datos);  
		},
		prGrupo: function(datos) {
			return $http.post('service/prGrupo.php', datos);  
		},
		prTipoVinculacion: function(datos) {
			return $http.post('service/prTipoVinculacion.php', datos);  
		},
		prSemillero: function(datos) {
			return $http.post('service/prSemillero.php', datos);  
		},
		prConvocatoria: function(datos) {
			return $http.post('service/prConvocatoria.php', datos);  
		},
		prTipoProducto: function(datos) {
			return $http.post('service/prTipoProducto.php', datos);  
		}														

		}
    return servicio;
});