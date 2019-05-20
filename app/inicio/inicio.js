
angular.module('myAppInvestigador')
// .directive('myUsuario', [function () {

//     return {
//       restrict: 'AE',     
//        controller: [ "$scope","$window",'$http', function($scope,$window,$http) {
//        }],
//         template : '<div class="modal fade" id="myModal"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' + 
//                     '<div class="modal-dialog">' +
//         '<div class="modal-content">' +
//             '<div class="modal-header">' +
//                 '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
//                 '<h4 class="modal-title" id="myModalLabel">Validación Usuario</h4>' +
//             '</div>' +
//             '<div class="modal-body"> ' +
//                  '<h4> Usuario o clave incorrectos </h4> ' +
//                   '<div><label id="nombreCentro"></label>' +
//             '</div>' +
//             '<div class="modal-footer">' +                
//                 '<button type="button" class="btn btn-default" data-dismiss="modal"  >ACEPTAR</button>' +
//             '</div>' +        
//         '</div>' +        
//     '</div>' +    
//   '</div>' +
// '</div>'
//     };
//   }])

  .controller('InicioController',['$scope', 'TareasResource', '$location','$window', function ($scope,TareasResource, $location,$window) {
    if ($window.sessionStorage.getItem('tipoUsuario') == "null" )
      {
         $location.path('/inicio');
         return;
       }
      if ($window.sessionStorage.getItem('tipoUsuario')==0)
         {
          $scope.Titulo ="Administrador";
         }
        if ($window.sessionStorage.getItem('tipoUsuario')==1)
        {
          $scope.Titulo ="Investigador";
        }    
       if($window.sessionStorage.getItem('tipoUsuario')==2)
        {
          $scope.Titulo ="GRUPO";
        }
         if($window.sessionStorage.getItem('tipoUsuario')==3)
        {
          $scope.Titulo ="CONVOCATORIA";
        }
        if($window.sessionStorage.getItem('tipoUsuario')==4)
        {
          $scope.Titulo ="PROPUESTAS";
        }
        if($window.sessionStorage.getItem('tipoUsuario')==5)
        {
          $scope.Titulo ="SEMILLERO";
        }
         if($window.sessionStorage.getItem('tipoUsuario')==6)
        {
          $scope.Titulo ="EVALUACIÓN PROPUESTAS";
        }
      if ( $window.sessionStorage.getItem('usuario') == "")
        {
          $scope.$parent.mnuInvestiga =false;
            $scope.$parent.mnuAdmin = false;
            $scope.$parent.mnuConvocatoria = false;
      }
    function usrASesion(usr) {
        // $scope.usrConectado.nombre = usr[0].Usuario;
        //  $scope.usrConectado.puesto = 1;
        // $scope.usrConectado.estaConectado = true;
        //  $cookieStore.put('estaConectado', true);
        //  $cookieStore.put('usuario', usr);
         $window.sessionStorage.setItem('usuario', JSON.stringify(usr[0]));
          $scope.$parent.mnuInvestiga =true;
            $scope.$parent.mnuAdmin = false;
            $scope.$parent.mnuConvocatoria = false;
            var datos = {
              Accion:'SELECT',
              Usuario:usr[0].Id
            }
            var executesql = TareasResource.prInvestigador(datos);
                executesql.then(function(result){
                  if (result.data[0]==null) 
                  {
                    $window.alert("No existe el investigador para el actual usuario");
                     $window.sessionStorage.setItem('tipoUsuario',null);
                      $window.sessionStorage.setItem('usuario',null);
                       $location.path('/inicio');
                    return;
                  }
                  $window.sessionStorage.setItem('investigador', JSON.stringify(result.data[0]));
                  $scope.$parent.idInve= result.data[0].INV_CODI
                  $location.path('/edit-investigador/'+ result.data[0].INV_CODI );
                  return;
                });            
      //     if ($window.sessionStorage.getItem('Id_tipo')==-1)
      //    {
      //       $scope.$parent.mnuAdmin = true;           
      //        $location.path('/edit-usuario/' + usr[0].Id);         
      //        return;
      //    }
      //    if ($window.sessionStorage.getItem('tipoUsuario')==0 && usr[0].Id_tipo ==0)
      //    {
      //       $scope.$parent.mnuAdmin = true;           
      //        $location.path('/menuAdministracionGeneral');
      //       return;
      //    }
      //     if  ($window.sessionStorage.getItem('tipoUsuario')==1 && usr[0].Id_tipo ==1)
      //     {
           
      //     }
      //    if  ($window.sessionStorage.getItem('tipoUsuario')==2 && usr[0].Id_tipo ==1)
      //    {
      //      var executesql = TareasResource.SQL({Accion:'S',SQL:'SELECT INV_CODI,INV_NOMB,INV_APEL FROM sgi_inve WHERE INV_CODI_USUA=' + usr[0].Id});
      //           executesql.then(function(result){
      //           $window.sessionStorage.setItem('investigador', JSON.stringify(result.data[0]));
      //           $location.path('/grupo');
      //       return;
      //     });
      //    }     
      //     if  ($window.sessionStorage.getItem('tipoUsuario')==4 && usr[0].Id_tipo ==1)
      //    {

      //      var executesql = TareasResource.SQL({Accion:'S',SQL:'SELECT INV_CODI,INV_NOMB,INV_APEL FROM sgi_inve WHERE INV_CODI_USUA=' + usr[0].Id});
      //           executesql.then(function(result){
      //              $window.sessionStorage.setItem('investigador', JSON.stringify(result.data[0]));
      //       $location.path('/propuesta');
      //       return;
      //     });
      //    }

      //   if  ($window.sessionStorage.getItem('tipoUsuario')==3 && usr[0].Id_tipo ==0)
      //    {
      //       $location.path('/convocatoria');
      //       return;
      //    }

      //    if  ($window.sessionStorage.getItem('tipoUsuario')==5 && usr[0].Id_tipo ==1)
      //    {
      //     $scope.$parent.mnuInvestiga =false;
      //       $scope.$parent.mnuAdmin = false;
      //       $scope.$parent.mnuConvocatoria = false;
      //      var executesql = TareasResource.SQL({Accion:'S',SQL:'SELECT INV_CODI,INV_NOMB,INV_APEL FROM sgi_inve WHERE INV_CODI_USUA=' + usr[0].Id});
      //           executesql.then(function(result){
      //              $window.sessionStorage.setItem('investigador', JSON.stringify(result.data[0]));
      //       $location.path('/semillero');
      //       return;
      //     });

      //    }
      //     if  ($window.sessionStorage.getItem('tipoUsuario')==6 && usr[0].Id_tipo ==1)
      //    {

      //     $scope.$parent.mnuInvestiga =false;
      //       $scope.$parent.mnuAdmin = false;
      //       $scope.$parent.mnuConvocatoria = false;
      //      var executesql = TareasResource.SQL({Accion:'S',SQL:'SELECT I.INV_CODI,I.INV_NOMB,I.INV_APEL FROM sgi_inve AS I INNER JOIN sgi_prop_conv_juez AS J ON J.PCJU_INV_CODI=I.INV_CODI  WHERE I.INV_CODI_USUA=' + usr[0].Id});
      //           executesql.then(function(result){

      //             if (result.data[0]!=null)

      //             {

      //               $window.sessionStorage.setItem('investigador', JSON.stringify(result.data[0]));

      //               $location.path('/evaluador');

      //               return;

      //             }

      //             else

      //             {

      //               $window.alert("No está asignado como evaluador");

      //               return;

      //             }

            

      //     });

      //    }





      // // $window.alert("El usuario no concuerda con el tipo de usuario seleccionado"); 



      // // $window.sessionStorage.setItem('tipoUsuario',null);

      // // $window.sessionStorage.setItem('usuario',null);



    };

    



    // $scope.onClicSalir = function()

    // {

    //   if ( $window.sessionStorage.getItem('tipoUsuario')==1)
    //   {
    //     $window.sessionStorage.setItem('tipoUsuario',null); 

    //     $location.path('/menuInvestigador');
    //   }
   
    //   if ( $window.sessionStorage.getItem('tipoUsuario')==2)
    //   {
    //     $window.sessionStorage.setItem('tipoUsuario',null); 

    //     $location.path('/menuGrupo');
    //   }
    // }



    $scope.showRegistrarse = function(){

      $location.path('/edit-usuario/-1');

    }  



     $scope.iniciarSesion = function() {



      var datos =

      {

        Accion :'Iniciar',
        Usuario: $scope.usuario,
        Clave: md5($scope.clave)

      }



      var loguearse = TareasResource.prIniciar(datos);

        loguearse.then(function(result){



         if (result.data[0]!=null)



            {



               if ($window.sessionStorage.getItem('tipoUsuario') ==-1)

               {

                 usrASesion(result.data);

                 return;

               }



              if (($window.sessionStorage.getItem('tipoUsuario') !=0 &&  $window.sessionStorage.getItem('tipoUsuario')!=3 )  && result.data[0].Id_tipo==0)

              {

                $window.alert("El usuario no corresponde con el tipo seleccionado");

                return;

              }

              else

                usrASesion(result.data);

            }

            else

            {

               $window.alert("No existe el usuario o la clave no corresponde");

            }



        });

   

  // var usr = TareasResource.login.query({Usuario: $scope.usuario, Contrasena: md5($scope.clave)})





  

  //           usr.$promise.then(function(usr) { 

              

  //          inicioSesion.resolve(usr);         

  //       },

  //         function(error) {

  //                    $('#myModal').modal('show'); 

  //         });

        }

  }]);