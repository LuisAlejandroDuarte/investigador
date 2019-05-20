var eliminarProducto2;
'use strict';
angular.module('myAppInvestigador')
.directive('myModalproyectos', function() {
       return {
        restrict : 'AE',    
        controller: [ "$scope","$window",'$http','TareasResource', function($scope,$window,$http,TareasResource) {
            $scope.afirmaEliminar = function() {
                      var Codigo =parseInt($('#myModalEliminaProyecto').data('id').toString());


                       var result= TareasResource.validaExisteRegistro.query({Tabla:"sgi_prod_proy",Campo:"id_proy",Valor:Codigo});
                       result.$promise.then(function(result2){

                        if (result[0]['existe']=="true")
                            {
                              $window.alert("Debe primero eliminar los productos relacionados al proyecto");
                              $('#myModalEliminaProyecto').data('id', 0).modal('hide'); 
                              return;
                            }
                            else
                            {
                                var datos ={
                                Accion:'DELETEPROYECTO',
                                Codigo:Codigo
                            }

                          var borrar =TareasResource.prProyectoProducto(datos);
                              borrar.then(function(res){

                          datos ={
                                Accion:'DELETEPROYECTO2',
                                Codigo:Codigo
                            }

                         borrar =TareasResource.prProyectoProducto (datos);
                            borrar.then(function(res){
                            datos ={
                                Accion:'DELETEPROYECTO3',                               
                                Codigo:Codigo
                            }

                            borrar =TareasResource.proyectoProducto(datos);
                            borrar.then(function(res){

                               datos ={
                                Accion:'DELETEPROYECTO4',
                                Codigo:Codigo
                            }

                            borrar =TareasResource.SQL(datos);
                            borrar.then(function(res){

                                $('#tableinvestigadoredit').bootstrapTable('removeByUniqueId', Codigo);
                                 $('#myModalEliminaProyecto').data('id', 0).modal('hide');  


                            });
                            
                         });       
                      });
                       
                    });                    
                  }
                });
                     
              };
               
            }],

        template : '<div class="modal fade" id="myModalEliminaProyecto"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' + 
                    '<div class="modal-dialog">' +
        '<div class="modal-content">' +
            '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                 '<h3 class="modal-title" id="myModalLabel">Advertencia!</h3> ' +
            '</div>' +
            '<div class="modal-body"> ' +
                 '<h4> Desea Borrar el proyecto? </h4> ' +
                  '<div><label id="nombreProyecto"></label>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<button ng-click= "afirmaEliminar();" class="btn btn-danger"  id="btnYes" >Si</button>' +
                '<button type="button" class="btn btn-default" data-dismiss="modal"  >No</button>' +
            '</div>' +        
        '</div>' +        
    '</div>' +    
'</div>' +
'</div>',
  
    }
})  

.directive('initTablainvestigadoredit', ['$compile', function($compile) {
        return {
            restrict: 'A',

      link: function(scope, el, attrs) {
                var opts = scope.$eval(attrs.initTablainvestigadoredit);   
                opts.onLoadSuccess = function() {
                    $compile(el.contents())(scope); 
            };
             el.bootstrapTable(opts);
              scope.$watch(el, function (bstable) {
                    $compile(el.contents())(scope);
                });    
                el.bind('body-changed.bs.table', function () {
                    var body = el.find('tbody')[0];
                    console.log('get here one more time');
                    $compile(body)(scope);
                });
            }
        }
    }])



  
  .controller('editInvestigador',['$scope','$timeout','$window','$location','TareasResource','$route','$base64','$q', function($scope,$timeout,$window,$location,TareasResource,$route,$base64,$q) {
    var id_inve;
    var idInvestigador;    
    var oldUser;
    var oldIdentificacion;
    var strmd5;
  $('#tableinvestigadoredit').bootstrapTable('load',[]);
    $scope.mostrarboton=true;
   
    id_inve = parseInt($route.current.params.idInvestigador);
    var user = JSON.parse($window.sessionStorage.getItem('usuario'));

    if (user==null || user==undefined)
    {

      $location.path('/inicio');
      return;
      }

    $scope.settingsPanel ={
             width: 900,
             height: 200,
             autoUpdate:true
        };
  $scope.pass ={
    strPass:'',
    strRePass:''
  };

   $scope.mostrarboton2 = function() {
       $scope.mostrarboton=true;
  };
   $scope.mostrarboton3 = function() { 
     $scope.mostrarboton=false;
      $scope.volverLista();
  };

  $scope.nomostrarboton = function() {
     $scope.mostrarboton=false;
  };
   $scope.proy ={
          selTipoInvestigador:'',
          selEntidad:'',
          selLineaInvestigador:'',
          selGrupoProducto:''          
        };

  moment.locale('es');
  $scope.options = {                                
                cache: false,
                height: 300,
                striped: true,
                pagination: true,
                pageList: [10, 25, 50, 100, 200],
                search: true,
                showColumns: true,
                uniqueId:'PRO_CODI',
                toolbar:'#toolbarinvestigadoredit',
                showRefresh: true,
                minimumCountColumns: 2,                            
               
            columns: [{
                field: 'PRO_CODI',
                title: 'Código',
                align: 'left',
                valign: 'middle',
                width: 100,
                visible:false,
                switchable:false
            },  {
                field: 'PRO_NOMB',
                title: 'NOMBRE',
                align: 'left',
                valign: 'middle',
                width: 400,
                sortable: true
            }, {
                field: 'PRO_FINA',
                title: 'FINANCIACIÓN',
                align: 'left',
                valign: 'middle',
                 width: 200,
                sortable: true,
                formatter: function(value, row, index) {

                       return '$ ' + formatNumero(value);

                },

            }, {
                field: 'fecha_ini',
                title: 'Fecha Inicio',
                align: 'left',
                valign: 'middle',
                 width: 100,
                sortable: true,
                 formatter: function(value, row, index) {
                      if (value==null)
                          return '';
                        else
                          return moment(value).format("DD MMMM YYYY");
                      },
            }, {
                field: 'fecha_ter',
                title: 'Fecha Termina',
                align: 'left',
                valign: 'middle',
                width: 100,
                sortable: true,
                  formatter: function(value, row, index) {
                      if (value==null)
                          return '';
                        else
                          return moment(value).format("DD MMMM YYYY");

                },
            },{
                field: 'id_grupo',
                title: '',                
                visible:false,
                switchable:false
            },{
                field: 'id_tipoInvestigador',
                title: '',                
                visible:false,
                switchable:false
            },{
                field: 'id_convocatoria',
                title: '',                
                visible:false,
                switchable:false
            },{
                field: 'id_linea',
                title: '',                
                visible:false,
                switchable:false
            },{
                title: '',
                width: 35,
                switchable:false,
                formatter: function(value, row, index) {

                       return '<a class="edit ml10 btn btn-default btn-xs" title="Editar"><span class="glyphicon glyphicon-pencil"></span></a>';

                },
                events:  window.operateEvents = {                        

                        'click .edit': function (e, value, row, index) {

                                 $scope.hideTable=true;  
                                 $scope.hideProyecto =false; 
                                 $scope.showProyecto(row);   
                                  $timeout(function() {
                                               
                                  $scope.$$childTail.myFormProductos.date1.$invalid=false;     
                                    $scope.$$childTail.myFormProductos.fechaLibro.$invalid=false;     
                                     $scope.$$childTail.myFormProductos.grupo.$invalid=false;  
                                      $scope.$$childTail.myFormProductos.idstrFinanciacion.$invalid=false;   
                                               
                                   $scope.$$childTail.myFormProductos.$invalid=false;                
                                   $scope.$$childTail.$apply()
                                  });
                               
                                 //$scope.$apply();   
                               
                        }

                }
            },{
                title: '',
                width: 35,
                switchable:false,
                formatter: function(value, row, index) {

                       return '<a class="edit ml10 btn btn-default btn-xs" title="Editar"><span class="glyphicon glyphicon-trash"></span></a>';

                },
                events:  window.operateEvents = {                        

                        'click .edit': function (e, value, row, index) {

                                 $('#nombreProyecto').text(row.PRO_NOMB);
                                  $('#myModalEliminaProyecto').data('id', row.PRO_CODI).modal('show');   
                               
                        }

                }
            }]
        };    
         $('#myModal').show();  
         

            var datos = {
              Accion: "SELECTID",
              Investigador:id_inve
            }

        var dat = TareasResource.prInvestigador(datos);      

        dat.then(function(datos){      
                id_inve = datos.data[0].INV_CODI;
                var datosInvestigador = datos.data;
               $scope.hideTable=false;  
               $scope.hideProyecto =true;   
                  $scope.viewDatos = datos.data; 
                    var day;
                     var mounth;
                     var year;
                     var fechaStr;

                     day = moment(datosInvestigador[0].INV_FECH_NACI).format("D");
                     mounth = moment(datosInvestigador[0].INV_FECH_NACI).format("M");
                     year = moment(datosInvestigador[0].INV_FECH_NACI).format("YYYY");

                     fechaStr = year + "," + mounth + "," + day;

                     $scope.viewDatos[0].INV_FECH_NACI =moment(datosInvestigador[0].INV_FECH_NACI).format("DD-MMMM-YYYY");
            
              oldIdentificacion = datos.data[0].INV_IDEN;   
              var productos ={
                Accion :'SELECT',
                IdInvestigador:id_inve
             }

             var consulta = TareasResource.prProductos(productos);

                  consulta.then(function(dat){

                   $('#tableinvestigadoredit').bootstrapTable('load',[]);
                      if (dat.data[0]!=null)
                          $('#tableinvestigadoredit').bootstrapTable('load',dat.data);

                      
                          var datos = {

                            Accion:'SELECT'        
                    
                        }
                    
                        var select = TareasResource.prTipoDocumento(datos);
                            select.then(function(result){
                    
                              $scope.Documento = result.data;
                    
                    
                          
                            var parametros = {
                              Accion:"SELECT" 
                            }
                    
                           select = TareasResource.prTipoCargo(parametros); 
                    
                    
                            select.then(function(result){
                    
                              $scope.listTipoCargo = result.data;
                    
                              parametros = {
                                Accion:"SELECT" 
                              }
                    
                               select = TareasResource.prCentro(parametros); 
                           select.then(function(result){
                    
                                $scope.Centro = result.data;
                              parametros = {
                                Accion:"SELECT" 
                              }
                                select = TareasResource.prProgramaAcademico(parametros); 
                    
                                  select.then(function(result){
                                      $scope.Programa =result.data;
                                      $scope.academico =result.data;
                    
                                  
                                      parametros = {
                                        Accion:"SELECT" 
                                      }
                    
                    
                                           select = TareasResource.prNivelFormacion(parametros);  
                    
                    
                                       select.then(function(result){
                                          $scope.formacion  =result.data;
                    
                    
                                              var items ={
                                                  Accion:"SELECTBYIDINVE",
                                                  IdInve: id_inve 
                                                 }
                    
                                                var  grupo = TareasResource.prGrupo(items); 
                                                  $scope.grupoinvestigacion  =[];
                                                grupo.then(function(result2){
                                                  if (result2.data[0]!=null)
                                                    $scope.grupoinvestigacion  = result2.data;
                                                  items= {
                                                    Accion:'SelectNivelFormId_inve',
                                                    IdInve:$route.current.params.idInvestigador 
                                                  }
                    
                                                      var informacionacademica =TareasResource.prNivelFormacion(items);
                    
                                                      // var informacionacademica =TareasResource.execute.query({Accion: "S",
                                                      //                  SQL: "SELECT * from sgi_inve where inv_iden=0"});
                    
                                                    var tieneDatos = false;
                                                    $scope.informacionacademica =[];  
                                                      informacionacademica.then(function(result2){
                                                        if (result2.data[0]!=null)
                                                        {
                                                          angular.forEach(result2.data, function(value, key){
                                                            if (value.Agno==undefined)
                                                            {              
                                                              $scope.informacionacademica =[];              
                                                            }
                                                            else
                                                              tieneDatos =true;
                                                                        
                                                          });
                                                          var idConsecutivo=0;
                                                          if (tieneDatos==true)
                      
                                                               angular.forEach(result2.data,function(item){
                                                                  $scope.informacionacademica.splice(0,0,{Consecutivo:idConsecutivo,Nombre:item.Nombre,Sel:false,Codi:item.Codi, titulo:item.titulo,Instituto:item.Instituto,Agno:item.Agno});                                        
                                                                  idConsecutivo = idConsecutivo+1;
                                                               });  
                                                        }
                                                       
                                                         
                                                             items= {
                                                              Accion:'SELECT'                                          
                                                            }
                    
                                                         select= TareasResource.prTipoVinculacion(items);                                            
                    
                                                                   select.then(function(result){
                    
                                                                        $scope.tipoinve =result.data;
                                                                        items= {
                                                                          Accion:'SELECT'                                          
                                                                        }
                                                                            select= TareasResource.prConvocatoria(items);
                                                                                   select.then(function(result){
                    
                                                                                        $scope.convocatoria =result.data;
                                                                                        items= {
                                                                                          Accion:'SELECT'                                          
                                                                                        }
                                                                                         select= TareasResource.prTipoProducto(items);  
                                                                                               select.then(function(result){
                    
                                                                                                   $scope.productos =result.data;
                                                                                                   items= {
                                                                                                    Accion:'SELECTBYIDINVE',
                                                                                                    IdInve: $route.current.params.idInvestigador                                   
                                                                                                  }
                                                                                                    var grupoinvestigacion =  TareasResource.prGrupo(items); 
                    
                                                                                            
                                                                                                        $scope.grupoinvestigacion =[];
                                                                                                        grupoinvestigacion.then(function(result2){
                                                                                                          tieneDatos = false;
                                                                                                          angular.forEach(result2.data, function(value, key){
                                                                                                            if (value.NombreGrupo==undefined)
                                                                                                            {              
                                                                                                              $scope.grupoinvestigacion =[];              
                                                                                                            }
                                                                                                            else
                                                                                                              tieneDatos =true;
                                                                                                                        
                                                                                                          });
                                                                                                          if (tieneDatos==true)
                                                                                                                $scope.grupoinvestigacion = result2.data;           
                                                                                                        });
                    
                                                                                                        $scope.grupoProyecto =[];
                                                                                                        items= {
                                                                                                          Accion:'SELECT'                                                                                     
                                                                                                        }
                                                                                                       var semillero = TareasResource.prSemillero(items); 
                                                                                                        semillero.then(function(semilla)
                                                                                                        {
                                                                                                          $scope.semillero = semilla.data;
                                                                                                          items= {
                                                                                                            Accion:'SelectSemilleroInvestigacion',
                                                                                                            IdInve:$route.current.params.idInvestigador                                                                          
                                                                                                          }
                        
                                                                                                            var semilleroinvestigacion =  TareasResource.prSemillero(items); 
                        
                                                                                                              $scope.semilleroinvestigacion =[];
                                                                                                              semilleroinvestigacion.then(function(result) {
                        
                                                                                                                $scope.semilleroinvestigacion = result.data;       
                                                                                                                $('#myModal').hide();    
                                                                                                              });
                                                                                                        })
                    
                                                                                                     
                    
                                                                                                                
                                                                                               });
                                                                                   });
                                                                   });
                                                                  
                                                      });
                                                    });
                                                      
                                                });
                                      
                                  });
                    
                              });           
                           });
                           
                    });
                    
                  })

      });

      $scope.showProyecto  = function(codi)
      {
        
        $scope.proy ={

          selTipoInvestigador:codi.id_tipoInvestigador,
          selEntidad:codi.id_convocatoria,          
          selGrupoProducto:codi.id_grupo          
        };

        if (codi.id_grupo!=undefined && codi.id_linea!=undefined)

            var parametros = {
              Accion:"SELECTLINEABYGRUPO",
              IdGrupo:codi.id_grupo
            }

            $scope.grupolineaproducto = TareasResource.prLineaInvestigacion(parametros); 

                $scope.grupolineaproducto.then(function(result){

                  $scope.proy.selLineaInvestigador=codi.id_linea;
                  $scope.idProyecto = codi.PRO_CODI;
        

                  if (codi.PRO_CODI==0)
                  {
                    $scope.proyectoProducto=[];
                    $('#strNombreProyecto').val("");
                    $('#strTitulo').val("");
                    $('#strFechaTitulo').val("");          
                    $('#strFinanciacion').val("");          
                    $('#fechaInicioProyecto').val("");
                    $('#fechaTerminaProyecto').val("");         
                  }
                  else
                  {
                    var parametros = {
                      Accion:"SelectProyectoProducto",
                      IdProyecto: $scope.idProyecto,
                      IdInve:$route.current.params.idInvestigador
                    }
                      var proyectoProducto=TareasResource.prProyectoProducto(parametros);
          
                      $scope.proyectoProducto =[];
                      proyectoProducto.then(function(result2){
                    tieneDatos = false;
                    $scope.proyectoProducto = result2.data;  
                    angular.forEach(result2.data, function(value, key){
          
                      if (value==null)
                      {              
                        $scope.proyectoProducto =[];              
                      }
                      else
                        tieneDatos =true;
                                  
                    });
                    if (tieneDatos==true)
                    {
                          $scope.proyectoProducto = result2.data;     
                          if (eliminarProducto2==undefined) eliminarProducto2=JSON.stringify(result2);   
                          eliminarProducto2=JSON.stringify(result2);   
                        }
                  });
          
          
                  $('#strNombreProyecto').val(codi.PRO_NOMB);
                  $('#strFinanciacion').val(codi.PRO_FINA);  
                  format($('#strFinanciacion')[0]);
                  $scope.selGrupoProducto = codi.id_grupo;
                  var fecha  =new Date(codi.fecha_ini);
          
          
          
                  $('#fechaInicioProyecto').val(moment(codi.fecha_ini).format("DD") + '-' + moment(codi.fecha_ini).format("MMMM")[0].toUpperCase() + moment(codi.fecha_ini).format("MMMM").substring(1) + '-' + moment(codi.fecha_ini).format("YYYY")); 
          
                  if (codi.fecha_ter==null)
                  {
          
          
                    $('#fechaTerminaProyecto').val("");
                   // $scope.fechaTerminaProy=moment();
                  }
                  else
                  {
                    fecha  =new Date(codi.fecha_ter);
                    $('#fechaTerminaProyecto').val(moment(codi.fecha_ter).format("DD") + '-' + moment(codi.fecha_ter).format("MMMM")[0].toUpperCase() + moment(codi.fecha_ter).format("MMMM").substring(1) + '-' +moment(codi.fecha_ter).format("YYYY"));
          
                  }
          
          
                  }
              });               

      }


      $scope.agregarProducto = function()
      {
        var strNombreProducto =$('#strNombreProducto').val();
        var strTituloProducto =$('#strTituloProducto').val();
        var selProducto =parseInt($("#selProducto").val()) +1;
        var strNombreTipoProducto =$("#selProducto option:selected").text();
        var fecha = $('#strFecha').val();
        var existe = false;

        if (strNombreProducto=="")
        {
            $window.alert("Falta nombre del producto");
            return;
        }

        if (strTituloProducto=="")
        {
            $window.alert("Falta título del producto");
            return;
        }

        if (fecha=="")
        {
            $window.alert("Falta seleccionar una fecha");
            return;
        }

        angular.forEach($scope.proyectoProducto,function(item){

          if (strNombreTipoProducto == item.NombreTipoProducto && item.NombreProducto==strNombreProducto && item.TituloProducto==strTituloProducto)
              {
                existe=true;
              }

          });

        if (existe==true)
        {
          $window.alert("Ya existe el Producto");
          return;
        }
       
        $scope.proyectoProducto.splice(0,0,{IdProducto:0,IdTipoProducto:selProducto,NombreTipoProducto:strNombreTipoProducto,NombreProducto:strNombreProducto,TituloProducto:strTituloProducto,Fecha:fecha});
        eliminarProducto2 = JSON.stringify($scope.proyectoProducto);   
      }

      $scope.eliminarProducto = function()
      {
          $('#myModal').show();    
          var eliminar=[];
           
        
        while ($scope.proyectoProducto.find(x=>x.Sel==true)!=undefined)
        {
          var dato = $scope.proyectoProducto.findIndex(x=>x.Sel==true);

           eliminar.push($scope.proyectoProducto[dato]);

          if (dato!=undefined)
          {

            $scope.proyectoProducto.splice(dato,1); 
          }
        }

        $('#myModal').hide();    

        eliminarProducto2=JSON.stringify(eliminar);   

        //  TareasResource.SQLMulti(eliminar).then(function(result) { 
         
        //  });

      }

      $scope.btnNovoClick = function() {

          var codi ={
            PRO_CODI:0
          }
          $scope.hideTable=true;  
          $scope.hideProyecto =false;     
          $scope.mostrarboton=false;
          $scope.limpiarFormProductos();          
          $scope.showProyecto(codi);    
      }

      $scope.limpiarFormProductos = function() {
        $scope.strNombreProyecto ="";
        $scope.strFinanciacion ="";
        $scope.fechaInicioProy ="";
        $scope.fechaTerminaProy="";
      }

      function formatoFecha(fecha) {
           var mes;   
         var Meses =["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
                ];


         var dat = fecha.split("-");

        if (dat[1]==Meses[0] || dat[1]=="01") mes ="01";
        if (dat[1]==Meses[1] || dat[1]=="02") mes ="02";
        if (dat[1]==Meses[2] || dat[1]=="03")  mes ="03";
        if (dat[1]==Meses[3] || dat[1]=="04") mes ="04";
        if (dat[1]==Meses[4] || dat[1]=="05") mes ="05";
        if (dat[1]==Meses[5] || dat[1]=="06") mes ="06";
        if (dat[1]==Meses[6] || dat[1]=="07") mes ="07";
        if (dat[1]==Meses[7] || dat[1]=="08") mes ="08";
        if (dat[1]==Meses[8] || dat[1]=="09") mes ="09";
        if (dat[1]==Meses[9] || dat[1]=="10") mes ="10";
        if (dat[1]==Meses[10] || dat[1]=="11") mes ="11";
        if (dat[1]==Meses[11] || dat[1]=="12") mes ="12";

          if (isNaN(dat[1])==false)

            return dat[0] + "-" + mes + "-" + dat[2];
          else
            return dat[2] + "-" + mes + "-" + dat[0];         

      }

      function parseDate(s) {
        if (s=='') return '';
        var months = {Enero:0,Febrero:1,Marzo:2,Abril:3,Mayo:4,Junio:5,
                      Julio:6,Agosto:7,Septiembre:8,Octubre:9,Noviembre:10,Diciembre:11};
        var p = s.split('-');
        return new Date(p[2], months[p[1]], p[0]);
      }

      $scope.salvarProyecto = function()
      {

        moment.locale('es');

      

       var Meses =["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
                ];

        var max;
        var mes;
        var idProyecto;

        var strNombreProyecto = $('#strNombreProyecto').val();        
        var strFinanciacion = $('#strFinanciacion').val();

        while (strFinanciacion.indexOf(".")>0)
        {
         strFinanciacion= strFinanciacion.replace(".","");
        }

      

        if (fechaInicioProyecto=="")
        {
            $window.alert("Falta fecha Inicio Proyecto");
            $('#myModal').hide(); 
            return;
        }

                  

        if (strNombreProyecto=="")
        {
            $window.alert("Falta nombre del Proyecto");
             $('#myModal').hide(); 

            return;
        }

        

            if (strFinanciacion=="")
        {
            $window.alert("Falta financiación del Proyecto");
            $('#myModal').hide(); 
            return;
        }

         var fechaInicioProyecto = parseDate($('#fechaInicioProyecto').val());
         var fechaTerminaProyecto = parseDate($('#fechaTerminaProyecto').val());
        if ( $scope.idProyecto==0)
        {
          var parametros = {
            Accion:'INSERT',
            Nombre:strNombreProyecto,
            Financiacion:strFinanciacion

          }

            var  r= TareasResource.prProyecto(parametros);

            r.then(function(result2){
                idProyecto =parseFloat(result2.data[0].Max);

                // =" +     + ",id_tipoInvestigador=" +  + "," +
                //   " =" +  + ",  =" +  + 
                var fechaT =(fechaTerminaProyecto!='')? moment(new Date(fechaTerminaProyecto)).format("YYYY-MM-DD"):fechaTerminaProyecto;

                if (fechaT=='')
                {
                  r= TareasResource.execute.query({Accion: "I",SQL:"1;INSERT INTO sgi_proy_inve " +
                     " (id_inve,id_proy,fecha_ini,id_grupo," +
                    "id_tipoInvestigador,id_convocatoria,id_linea) " +
                    " VALUES (" + idInvestigador + "," + idProyecto + "," + 
                   "'" + moment($scope.$$childTail.fechaInicioProy).format("YYYY-MM-DD") + "', " + $scope.proy.selGrupoProducto + ", " +
                  "" + $scope.proy.selTipoInvestigador + ", " + $scope.proy.selEntidad +  "," + $scope.proy.selLineaInvestigador +  ")"});    

                }
                else
                {
                   r= TareasResource.execute.query({Accion: "I",SQL:"1;INSERT INTO sgi_proy_inve " +
                                                            " (id_inve,id_proy,fecha_ini,fecha_ter,id_grupo," +
                                                             "id_tipoInvestigador,id_convocatoria,id_linea) " +
                                                            " VALUES (" + idInvestigador + "," + idProyecto + "," + 
                                                              "'" + moment($scope.$$childTail.fechaInicioProy).format("YYYY-MM-DD") + "','" + fechaT + "', " + $scope.proy.selGrupoProducto + ", " +
                                                            "" + $scope.proy.selTipoInvestigador + ", " + $scope.proy.selEntidad +  "," + $scope.proy.selLineaInvestigador +  ")"});    

                }

               
                       r.$promise.then(function(result2){
                          $scope.idProyecto = result2[0].valor;

                              $scope.Lista =[];

                          var execute = {
                            Accion:'DELETEPROYECTOS',
                            idProy:idProyecto,
                            idInve: idInvestigador
                          }

                          var datos =TareasResource.prProyectoProducto(execute);
                            datos.then(function(borrado){
                              if ($scope.proyectoProducto.length>0)
                              {                              
                                angular.forEach( $scope.proyectoProducto,function(item){
                                  if (item.IdProducto==0)
                                  {
                                   $scope.Lista.splice(0,0,{IdProducto:0,IdTipoProducto:item.IdTipoProducto,NombreTipoProducto:item.NombreTipoProducto,NombreProducto:item.NombreProducto,TituloProducto:item.TituloProducto,Fecha:formatoFecha(item.Fecha)});
                                  }
    
                                });
                               
                                var datos = {
                                  Lista:$scope.Lista,
                                  idProy:idProyecto,
                                  idInve: idInvestigador
                                }
    
                              TareasResource.enviarProyectoProducto(datos).then(function(result) { 
    
                                var resultado = result;
                                    $('#myModal').hide(); 
                                    $window.alert("Guardado");
                                    $scope.pass.strPass="";
                                    $scope.pass.strRePass="";
                                    $scope.volverLista();
                                  
    
                              });
                           }
                           else
                           {
                              $('#myModal').hide(); 
                                    $window.alert("Guardado");
                                    $scope.pass.strPass="";
                                    $scope.pass.strRePass="";
                                    $scope.volverLista();
                           }

                           
                          });
                         
               
                  });

            });
          
        }
        else
        {

           var  r= TareasResource.execute.query({Accion: "M",SQL:"UPDATE  sgi_proy set PRO_NOMB ='" + strNombreProyecto + "'," +
                                                            " PRO_FINA=" + strFinanciacion + " WHERE PRO_CODI=" + $scope.idProyecto + ""});
            r.$promise.then(function(result2){
              if (result2[0].estado=="ok")                                                                                                                       
              {
                   var fechaT =(fechaTerminaProyecto!='')? moment(new Date(fechaTerminaProyecto)).format("YYYY-MM-DD"):fechaTerminaProyecto;

                 if (fechaT=='')
                 {
                   r= TareasResource.execute.query({Accion: "M",SQL:"UPDATE sgi_proy_inve set  fecha_ini ='" + moment(new Date(fechaInicioProyecto)).format("YYYY-MM-DD") + "'," + 
                  " fecha_ter=null, id_grupo=" +   $scope.proy.selGrupoProducto  + ",id_tipoInvestigador=" + $scope.proy.selTipoInvestigador + "," +
                  " id_convocatoria=" + $scope.proy.selEntidad + ", id_linea =" + $scope.proy.selLineaInvestigador + 
                  " WHERE id_inve=" + idInvestigador + " AND id_proy=" + $scope.idProyecto + ""});  
                 }   
                 else
                 {

                 r= TareasResource.execute.query({Accion: "M",SQL:"UPDATE sgi_proy_inve set  fecha_ini ='" + moment(new Date(fechaInicioProyecto)).format("YYYY-MM-DD") + "'," + 
                  " fecha_ter='" + fechaT + "', id_grupo=" +   $scope.proy.selGrupoProducto  + ",id_tipoInvestigador=" + $scope.proy.selTipoInvestigador + "," +
                  " id_convocatoria=" + $scope.proy.selEntidad + ", id_linea =" + $scope.proy.selLineaInvestigador + 
                  " WHERE id_inve=" + idInvestigador + " AND id_proy=" + $scope.idProyecto + ""});    
                }
                 r.$promise.then(function(result2){
                    if (result2[0].estado=="ok")
                    {

                             

                                  var eliminar=[];
                                  if (eliminarProducto2!=undefined || eliminarProducto2!='')
                                  angular.forEach(JSON.parse(eliminarProducto2),function(item) {
                                     

                                       eliminar.splice(0,0,{
                                        Accion:'D',
                                        SQL:'DELETE FROM sgi_prod_proy WHERE id_prod=' + item.IdProducto + ' AND id_proy=' + $scope.idProyecto

                                          }); 
                                         eliminar.splice(0,0,{
                                           Accion:'D',
                                            SQL:'DELETE FROM sgi_prod WHERE id=' + item.IdProducto 

                                         

                                      });

                                  });

                                  TareasResource.SQLMulti(eliminar).then(function(){
                                     if ($scope.proyectoProducto.length>0)
                                    {   
                                                                                   

                                              $scope.Lista =[];
                                             
                                              angular.forEach( $scope.proyectoProducto,function(item){

                                                
                                                 $scope.Lista.splice(0,0,{IdProducto:0,IdTipoProducto:item.IdTipoProducto,NombreTipoProducto:item.NombreTipoProducto,NombreProducto:item.NombreProducto,TituloProducto:item.TituloProducto,Fecha:formatoFecha(item.Fecha)});

                                              });
                                             
                                              var datos = {
                                                Lista:$scope.Lista,
                                                idProy:$scope.idProyecto,
                                                idInve: idInvestigador
                                              }

                                           

                                                  TareasResource.enviarProyectoProducto(datos).then(function(result) { 

                                                  var resultado = result;
                                                       $('#myModal').hide();
                                                      $window.alert("Actualizado");
                                                      $scope.pass.strPass="";
                                                      $scope.pass.strRePass="";
                                                       $scope.volverLista();                                                  
                                                  });
                                                                                                                          
                                     
                                      
                                    }  
                                      else
                                     {
                                     $('#myModal').hide(); 
                                      $window.alert("Actualizado");
                                      $scope.pass.strPass="";
                                      $scope.pass.strRePass="";
                                      $scope.volverLista();
                                     }
                                  });

                                 
                             
                          


                   
                   }
                                
                });
                }
             });
        } 
  }
      $scope.volverLista = function()
      {
        $scope.hideTable=false;  
        $scope.hideProyecto =true; 
          $('#tableinvestigadoredit').bootstrapTable('refresh',
              { url:'scripts/services/api.php?url=executeSQL/S/SELECT PI.id_grupo,PI.id_tipoInvestigador,PI.id_convocatoria,PI.id_linea,' +
              ' P.PRO_CODI, P.PRO_NOMB, P.PRO_FINA,PI.fecha_ini,PI.fecha_ter FROM sgi_proy_inve AS PI INNER JOIN sgi_inve AS I ON I.INV_CODI =PI.id_inve INNER JOIN sgi_proy AS P ON  ' + 
              ' P.PRO_CODI=PI.id_proy WHERE  PI.id_inve=' + id_inve });                      
      }


      $scope.jqxPanelSettings =
            {             

              height: "100",
              width:'95%',
              autoUpdate:true,
              theme:'bootstrap'
             
            }
     var Meses =["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
                ];
     
     var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth(); //hoy es 0!
    var Mes = Meses[mm-1];
    var yyyy = hoy.getFullYear();

    $scope.fechaHoy = new Date(yyyy, mm, dd);
    

    



    
     


      if($route.current.params.idInvestigador!='0') 
      {         
        $scope.buttonText = 'Actualizar';
        $scope.tiTulo ='Editando Investigador';
      }

      else
      {
        $scope.buttonText = 'Guardar';
         $scope.tiTulo ='Creando Investigador';
      }








$scope.onchangedcentro = function(idCentro){

     var parametros = {
       Accion:'SELECTZONACENTRO',
       idCentro:idCentro
     }
     $('#myModal').show(); 
     var zona = TareasResource.prCentro(parametros);
     zona.then(function(result){
      $scope.Zona =result.data;
      $('#myModal').hide(); 
     })
       

   };


   function addProyectoProducto(nombreProducto,selProducto,nombreProyecto,idProyecto,
                    fechaInicio,fechaTermina,finanaciacion)
   {

     var valido =true;
     var fechainiValue;
     var fechafinValue;
     var FechainiValue;
     var FechafinValue;
     var fechaini;
     var fechaterm;
     for (var i=0;i<$scope.proyectoProducto.length;i++)
     {
        if ($scope.proyectoProducto[i].idProducto==selProducto && $scope.proyectoProducto[i].idProyecto==idProyecto)
        {
          $window.alert("Ya existe en la selección");
          return;
        }
     }

          fechaini = new Date(fechaInicio);
          fechainiValue = fechaini.valueOf();
          fechaini = fechaini.getFullYear() + '-' + parseInt(fechaini.getMonth()+1) + '-' + fechaini.getDate();

          fechaterm = new Date(fechaTermina);
          fechafinValue = fechaterm.valueOf();
          fechaterm = fechaterm.getFullYear() + '-' + parseInt(fechaterm.getMonth()+1) + '-' + fechaterm.getDate();


          angular.forEach($scope.proyectoProducto,function (item){

             item.FechaInicio = new Date(item.FechaInicio + 'GMT-0500');
             FechainiValue = item.FechaInicio.valueOf();

             item.FechaTermina = new Date( item.FechaTermina + 'GMT-0500');
             FechafinValue = item.FechaTermina.valueOf();

            if ((fechainiValue>=FechainiValue && fechainiValue<=FechafinValue) || (fechafinValue>=FechainiValue && fechafinValue<=FechafinValue))
            {

              $window.alert('La fecha está dentro de alguna fecha ya seleccionada');
              valido = false;
              return forEach.break(); 
            }

            if (fechainiValue<=FechainiValue && fechafinValue>=FechafinValue)
            {
               $window.alert('La fecha está dentro de alguna fecha ya seleccionada');
               valido = false;
               return forEach.break(); 
            }

           
          });
       

          if (valido==true)
          {

           $scope.proyectoProducto.push({NombreProyecto:nombreProyecto,NombreProducto:nombreProducto,
           FechaInicio:fechaini,FechaTermina:fechaterm,Financiacion:finanaciacion,
            idProducto:selProducto,idProyecto:idProyecto});    
          }
   }

   $scope.onClicAddProductoProyecto = function(nombreProyecto,finanaciacion,selEntidad, 
              selProducto,nombreProducto,fechaInicio,fechaTermina){




    var idProyecto;

    if (nombreProyecto=="" || nombreProyecto==undefined)
    {
      $window.alert("Falta Nombre del Proyecto");
      return;
    }

    if (finanaciacion=="" || finanaciacion==undefined)
    {
      $window.alert("Falta finanaciación");
      return;
    }

    if (selEntidad=="" || selEntidad==undefined)
    {
      $window.alert("Falta Entidad/Convocatoria");
      return;
    }
    
    if (nombreProducto=="" || nombreProducto==undefined)
    {
      $window.alert("Falta seleccionar el Producto");
      return;
    }

     var existess = TareasResource.validaExisteRegistro.query({Tabla: "sgi_proy",Campo: "PRO_NOMB",Valor: nombreProyecto});
     
     existess.$promise.then(function (result) {
        if (result[0].existe=="false")
        {
            var  r= TareasResource.execute.query({Accion: "I",SQL:"0;sgi_proy;PRO_CODI;INSERT INTO sgi_proy " +
                                                            " (PRO_CODI,PRO_NOMB,PRO_FINA,PRO_CON_CODI) " +
                                                            " VALUES (@@,'" + nombreProyecto + "'," + finanaciacion + "," + selEntidad + ")"});
            r.$promise.then(function(result2){
                idProyecto = result2[0].valor;
                addProyectoProducto(nombreProducto,selProducto,nombreProyecto,idProyecto,
                    fechaInicio,fechaTermina,finanaciacion);
                  
            });

        }
        else
        {
          idProyecto =result[0].valor[0].PRO_CODI;           
          addProyectoProducto(nombreProducto,selProducto,nombreProyecto,idProyecto,
                    fechaInicio,fechaTermina,finanaciacion);
        }

      
    
     });                
   }



   $scope.onChangedProducto = function(selProducto)
   {

    $('#strNombreProducto').val("");
      $('#strTituloProducto').val("");

      $scope.libro =false;
      $scope.revista=false;
      $scope.software=false;

      switch(selProducto) {
           case "1":
              $scope.libro =true;
              break;
          case "2":
              $scope.revista =true;
              break;
          case "3":
              $scope.software=true;
              break;

      }      
   }

   $scope.onChangedGrup = function(idGrupo){
    $scope.grupolinea = [];
   var parametros = {
     Accion:'SELECTLINEASBYGRUPO2',
     gru_codi:idGrupo.gru_codi
   }
   $('#myModal').show(); 
 var grupolinea =  TareasResource.prLineaInvestigacion(parametros);
   grupolinea.then(function(result){
     $scope.grupolinea  =result.data;
     $('#myModal').hide(); 
   });

}

$scope.onChangedGrupProducto = function(idGrupo,idLinea){
 
  var parametros = {
    Accion:'SELECTLINEASBYGRUPO3',
    idGrupo:idGrupo
  }
  $('#myModal').show(); 
      $scope.grupolineaproducto = TareasResource.prLineaInvestigacion(parametros);


     $scope.grupolineaproducto.then(function(result){
          $scope.proy.selLineaInvestigador=idLinea;
          $scope.grupolineaproducto=result.data;
          $('#myModal').hide(); 
    });

};


    // $scope.onChangedSemillero = function(idSemillero) {

    //     $scope.semillerolinea = TareasResource.execute.query({Accion: 'S',
    //                      SQL: "SELECT l.lin_codi,l.lin_desc FROM sgi_line_inve_semi AS g " + 
    //                      " INNER JOIN sgi_line_inve AS l ON g.lis_line_inve_codi=l.lin_codi " +
    //                      " WHERE g.lis_semi_codi=" + idSemillero + ""}); 

    // };


   $scope.on_changedprograma = function(idPrograma){

      var parametros = {
        Accion:'SELECT2',
        idPrograma:idPrograma
      }
      $('#myModal').show(); 
      var Programa = TareasResource.prProgramaAcademico(parametros);
        Programa.then(function(result){
          $scope.Programa2 = result.data;
          $('#myModal').hide(); 
        });
       


   };

      $scope.agregarformacion = function(titu,tituloformacion,institucion,Agno,myformacion) {
        var existe =false;

        if (myformacion==undefined || myformacion=="")
        {
         $window.alert("Falta Nivel de Formación");          
          return; 
        }

        if ($('#tituloformacion').val()=="")
        {
          $window.alert("Falta título formación");
          $('#tituloformacion').focus();
          return;
        }

        if ($('#institucion').val()=="")
        {
          $window.alert("Falta Institución");
          $('#institucion').focus();
          return;
        }

        if ($('#Agno').val()=="" ||  parseInt($('#Agno').val())<0 )
        {
          $window.alert("Falta Año debe ser mayor que cero");
          $('#Agno').focus();
          return;
        }

        var datosformacion = TareasResource.execute.query({Accion: 'S',
                         SQL:"SELECT niv_codi,niv_nomb FROM sgi_nive_form WHERE niv_codi=" + myformacion.NIV_CODI + ""}); 


          datosformacion.$promise.then(function (result) { 

              $scope.informacionacademica.splice(0,0,{Consecutivo:$scope.informacionacademica.length, Nombre:result[0].niv_nomb + ' ' + tituloformacion + ' ' + institucion + ' ' + Agno,Sel:false,Codi:myformacion.NIV_CODI, titulo:tituloformacion,Instituto:institucion,Agno:Agno});                      
                   $('#tituloformacion').val("");
                   $('#institucion').val("");
                   $('#Agno').val("");

              // angular.forEach($scope.informacionacademica,function(item){
              // if (myformacion.NIV_NOMB!="PROFESIONAL")
              //   {
              //    if (item.Codi==myformacion.NIV_CODI)
              //     {
              //       existe = true;
              //     }
              //   }
              //   else
              //   {

              //   }


              //  });

              //  if (existe==true)
              //     {
              //        $window.alert("El nivel de Formación " + myformacion.NIV_NOMB + " ya está Incluido");
              //     }
              //     else
              //     {
                   

              //     }

          });

       

        

         
          // var numero = Enumerable.From(informacionacademica)
          //   .Where("p => p.Codi ==" + myformacion.NIV_CODI).Select();               
      };


      $scope.delformacion = function(formacion) {
        var idConsecutivo =0;
        var datos=[];
        $scope.informacionacademica.splice(formacion.$index,1);

        angular.forEach($scope.informacionacademica,function(item){
                datos.splice(0,0,{Consecutivo:idConsecutivo,Nombre:item.Nombre,Sel:false,Codi:item.Codi, titulo:item.titulo,Instituto:item.Instituto,Agno:item.Agno});                                        
                idConsecutivo = idConsecutivo+1;
             });    
        $scope.informacionacademica = datos;       
      };

$scope.delGrupoInvestigacion = function() {

       for(var i=0;i<$scope.grupoinvestigacion.length;i++)
        {
          if ($scope.grupoinvestigacion[i].Sel==true)
          {
            $scope.grupoinvestigacion.splice(i,1);
          }
        }
};


$scope.delSemilleroInvestigacion = function(){

        for(var i=0;i<$scope.semilleroinvestigacion.length;i++)
        {
          if ($scope.semilleroinvestigacion[i].Sel==true)
          {
            $scope.semilleroinvestigacion.splice(i,1);
          }
        }
};




$scope.OnClicEliminaProductoProyecto = function(){

        for(var i=0;i<$scope.proyectoProducto.length;i++)
        {
          if ($scope.proyectoProducto[i].Sel==true)
          {
            $scope.proyectoProducto.splice(i,1);
          }
        }
};

$scope.agregargrupoinvestigacion =  function(idgrupo,idlinea,fechaini,fechaterm)
{

  if (idgrupo==undefined)
  {
    $window.alert("Falta seleccionar el grupo");
    return;
  }

  if (idlinea==undefined)
  {
   $window.alert("Falta seleccionar línea");
    return; 
  }

if ($('#idFechaInicioGrupo').val()=="")
  {
   $window.alert("Falta seleccionar Fecha Inicio");
    return; 
  }


 var valido =true;
 var grupoexiste =false;
 var fechainiValue;
 var fechafinValue;
 var FechainiValue;
 var FechafinValue;
   var datosgrupo =TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT gru_nomb,gru_codi FROM sgi_grup WHERE gru_codi=" + idgrupo.gru_codi + ""});


  angular.forEach($scope.grupoinvestigacion,function(item){

      if (item.IdGrupo == idgrupo.gru_codi)
      {
        grupoexiste=true;
      }   

  });  

$scope.datagrupo = datosgrupo;
$scope.datagrupo.$promise.then(function (resultgrupo) {

    var datoslinea =TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT lin_desc,lin_codi FROM sgi_line_inve WHERE lin_codi=" + idlinea + ""});

      $scope.datalinea = datoslinea;
      $scope.datalinea.$promise.then(function (resultlinea) {
           fechaini = moment(fechaini,"YYYY-MM-DD").format("YYYY-MM-DD");  

          //  var day = moment(fechaini).format("D");
          //  var mounth = moment(fechaini).format("M");
          //  var year = moment(fechaini).format("YYYY");

        
          // fechaini = year + '-' + mounth + '-' + day;




          if ($('#idFechaFinGrupo').val()=="")          
            fechaterm="";                      
          else
          {
              fechaterm = moment(fechaterm,"YYYY-MM-DD").format("YYYY-MM-DD");             
          }

          // angular.forEach($scope.grupoinvestigacion,function (item){

          //    item.FechaInicio = new Date(item.FechaInicio + 'GMT-0500');
          //    FechainiValue = item.FechaInicio.valueOf();

          //    item.FechaTermina = new Date( item.FechaTermina + 'GMT-0500');
          //    FechafinValue = item.FechaTermina.valueOf();
          //  if (grupoexiste==true)
          //  {  
          //   if ((fechainiValue>=FechainiValue && fechainiValue<=FechafinValue) || (fechafinValue>=FechainiValue && fechafinValue<=FechafinValue))
          //   {

          //     $window.alert('La fecha está dentro de alguna fecha ya seleccionada');
          //     valido = false;
          //     return forEach.break(); 
          //   }

          //   if (fechainiValue<=FechainiValue && fechafinValue>=FechafinValue)
          //   {
          //      $window.alert('La fecha está dentro de alguna fecha ya seleccionada');
          //      valido = false;
          //      return forEach.break(); 
          //   }

          //  }
          // });
       

          if (valido==true)
          {

            $scope.grupoinvestigacion.push({NombreGrupo:resultgrupo[0].gru_nomb,IdGrupo:resultgrupo[0].gru_codi, 
                  NombreLinea:resultlinea[0].lin_desc, IdLinea:resultlinea[0].lin_codi,
                  FechaInicio:fechaini,FechaTermina:fechaterm,Sel:false});
            $scope.grupoProyecto.push({Id:resultgrupo[0].gru_codi,Nombre:resultgrupo[0].gru_nomb});
          }

          $('#idFechaInicioGrupo').val("");
          $('#idFechaFinGrupo').val("");
      });    
});

 



};

$scope.agregarSemilleroInvestigacion = function(idSemillero,idLinea,fechaInicioSemillero,fechaFinalSemillero)
{
   var valido =true;
   var fechainiValue;
   var fechafinValue;
   var FechainiValue;
   var FechafinValue;
   var fechaini;
   var fechaterm;
    var datos =TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT sem_codi,sem_nomb FROM sgi_semi WHERE sem_codi=" + idSemillero + ""});
    $scope.datos = datos;    
    $scope.datos.$promise.then(function (resultSemillero){

      var datos =TareasResource.execute.query({Accion: 'S',
                         SQL: "SELECT lin_codi,lin_desc FROM sgi_line_inve WHERE lin_codi =" + idLinea + ""});

        $scope.datos = datos;    
        $scope.datos.$promise.then(function (resultLinea){


            fechaini = moment(fechaInicioSemillero,"YYYY-MM-DD").format("YYYY-MM-DD");          


          if ($('#idfechaFinalSemillero').val()=="")          
            fechaterm="";                      
          else
          {
              fechaterm = moment(fechaFinalSemillero,"YYYY-MM-DD").format("YYYY-MM-DD");             
          }


          // fechaini = new Date(fechaInicioSemillero);
          // fechainiValue = fechaini.valueOf();
          // fechaini = fechaini.getFullYear() + '-' + parseInt(fechaini.getMonth()+1) + '-' + fechaini.getDate();

          // fechaterm = new Date(fechaFinalSemillero);
          // fechafinValue = fechaterm.valueOf();
          // fechaterm = fechaterm.getFullYear() + '-' + parseInt(fechaterm.getMonth()+1) + '-' + fechaterm.getDate();

        //   angular.forEach($scope.semilleroinvestigacion,function (item){

        //      item.FechaInicio = new Date(item.FechaInicio + 'GMT-0500');
        //      FechainiValue = item.FechaInicio.valueOf();

        //      item.FechaTermina = new Date( item.FechaTermina + 'GMT-0500');
        //      FechafinValue = item.FechaTermina.valueOf();

        //     if ((fechainiValue>=FechainiValue && fechainiValue<=FechafinValue) || (fechafinValue>=FechainiValue && fechafinValue<=FechafinValue))
        //     {

        //       $window.alert('la fecha está dentro de alguna fecha ya seleccionada');
        //       valido = false;
        //      return forEach.break(); 
        //     }

        //     if (fechainiValue<=FechainiValue && fechafinValue>=FechafinValue)
        //     {
        //        $window.alert('la fecha está dentro de alguna fecha ya seleccionada');
        //        valido = false;
        //        return forEach.break(); 
        //     }

        // });

          if (valido==true)
          {
             $scope.semilleroinvestigacion.push({NombreSemillero:resultSemillero[0].sem_nomb,IdSemillero:idSemillero,
                                                       NombreLinea:resultLinea[0].lin_desc,IdLinea:idLinea,
                                                       FechaInicio:fechaini,
                                                       FechaTermina:fechaterm,
                                                       Sel:false});
          }
    
    });
});
}




      $scope.uploadFile = function (input) {
 
     if (input.files && input.files[0]) {         

        var reader = new FileReader();
        reader.onload = function (e) {
            
             var dataURL = reader.result;
      var output = document.getElementById('photo-id');
      output.src = dataURL;
           
            //Sets the Old Image to new New Image
            // $('#photo-id').attr('src', e.target.result);
 
            // //Create a canvas and draw image on Client Side to get the byte[] equivalent
            // var canvas = document.createElement("canvas");
            // var imageElement = document.createElement("img");
 
            // imageElement.setAttribute('src', e.target.result);
            // canvas.width = 90;
            // canvas.height =90;
            // var context = canvas.getContext("2d");
            // context.drawImage(imageElement, 0, 0);
            // var base64Image = canvas.toDataURL("image/jpeg");
            // $('#photo-id').attr('src', base64Image);
            //Removes the Data Type Prefix 
            //And set the view model to the new value
           
            $scope.viewDatos[0].inv_foto = dataURL.replace(/data:image\/jpeg;base64,/g, '');



           // dato = base64Image.replace(/data:image\/(jpeg);base64,/g, "");
           
         // $scope.viewDatos[0].inv_foto=$scope.viewDatos[0].inv_foto.replace(new RegExp(/\//g),'|');
         // $scope.viewDatos[0].inv_foto=$scope.viewDatos[0].inv_foto.replace(new RegExp(/\+/g),'*');
            
            

           // $scope.viewDatos[0].inv_foto = $base64.encode($scope.viewDatos[0].inv_foto);
           // $scope.viewDatos[0].inv_foto=  $base64.decode($scope.viewDatos[0].inv_foto);
        }
          
        //Renders Image on Page
        reader.readAsDataURL(input.files[0]);
    }
};
 $scope.volver = function(){
      $scope.$parent.mnuInvestiga =false;
     $scope.$parent.mnuAdmin = false;
     $window.sessionStorage.setItem('usuario',null);
     $window.sessionStorage.setItem('tipoUsuario',null);
    $location.path('/inicio');
 
 };


function actualizarTablasRelacionadas(id){
    var  executeSql;
    var fechaini;
    var fechafin;
    executeSql= TareasResource.execute.query({Accion: "D",SQL:"DELETE FROM sgi_nive_inve " +
                                                    " WHERE NIN_INV_CODI = " + id });     
    executeSql.$promise.then(function (result)
    {
      if (result[0].estado=="ok")
      {


        var multiple = [];
        
        
        for(var i=0;i<$scope.informacionacademica.length;i++)
           {
           if ($scope.informacionacademica[i].Sel=="false" || $scope.informacionacademica[i].Sel==false)
              {

                  multiple.splice(0,0,
                    {
                      SQL:"INSERT INTO sgi_nive_inve  (NIN_INV_CODI,NIN_NIV_CODI,NIN_INST,NIN_AGNO,NIN_TITU_OBTE) " +
                   " VALUES (" + id + "," + $scope.informacionacademica[i].Codi + ",'" + 
                   $scope.informacionacademica[i].Instituto + "'," + 
                   $scope.informacionacademica[i].Agno + ",'" +
                   $scope.informacionacademica[i].titulo + "')",
                   Accion:'I'
                    })
                  // executeSql= TareasResource.execute.query({Accion: "I",SQL:id + ";INSERT INTO sgi_nive_inve " +
                  //  " (NIN_INV_CODI,NIN_NIV_CODI,NIN_INST,NIN_AGNO,NIN_TITU_OBTE) " +
                  //  " VALUES (" + id + "," + $scope.informacionacademica[i].Codi + ",'" + 
                  //  $scope.informacionacademica[i].Instituto + "'," + 
                  //  $scope.informacionacademica[i].Agno + ",'" +
                  //  $scope.informacionacademica[i].titulo + "')"}); 
              }
           }
            TareasResource.SQLMulti(multiple).then(function(result) { 

                  if (result.data[0]=="fallo")
                  {
                      $window.alert(result.data[0].msg);
                  }    
                  else
                  {
                      if ($scope.hideProyecto==false)
                      {

                          $scope.salvarProyecto();                                                        
                      }
                      else
                      {
                        $('#myModal').hide(); 
                          $window.alert("Guardado");
                          $scope.pass.strPass="";
                          $scope.pass.strRePass="";
                          $location.path('/edit-investigador/'+ id);
                      }                                                                                    
                     
                  }              

                });  
     
      }
      else
        $window.alert(result[0].msg);
    });
                 
}

$scope.onClicCVLAC = function(link)
{
  link = link.replace("http://","");

  link = "http://" + link;
  $window.open(link,"_blank");
}

$scope.save = function(investigador){

     $('#myModal').show();  

      var id = (investigador.INV_CODI || investigador.INV_CODI=="undefined") ? investigador.INV_CODI :'0' ;
 



      

      if (investigador.INV_TIPO_DOCU_CODI=="undefined" || investigador.INV_TIPO_DOCU_CODI=="")
      {
        $window.alert('Seleccione un tipo documento');
         $('#myModal').hide();  
        return;
      }

      if (investigador.INV_IDEN=="undefined" || investigador.INV_IDEN=="")
      {
        $window.alert('Digite un número de documento');
        $('#myModal').hide();  
        return;
      }
      

      if (investigador.INV_NOMB=="undefined" || investigador.INV_NOMB=="")
      {
        $window.alert('Digite nombre ');
        $('#myModal').hide();  
        return;
      }

      if (investigador.INV_APEL=="undefined" || investigador.INV_APEL=="")
      {
        $window.alert('Digite apellido');
        $('#myModal').hide();  
        return;
      }

       if (investigador.INV_FECH_NACI==undefined || investigador.INV_FECH_NACI=="Invalid date")
      {
        $window.alert('Seleccione fecha de nacimiento');
        $('#myModal').hide();  
        return;
      }

         if (investigador.INV_TELE_CELU==undefined || investigador.INV_TELE_CELU=="")
        {
          $window.alert('Digite teléfono');
          $('#myModal').hide();  
          return;
        }

        if (investigador.INV_MAIL==undefined || investigador.INV_MAIL=="")
        {
          $window.alert('Digite Email');
          $('#myModal').hide();  
          return;
        }

        

        if (investigador.INV_CENT_CODI==undefined || investigador.INV_CENT_CODI=="")
        {
          $window.alert('Seleccione CENTRO');
          $('#myModal').hide();  
          return;
        }


        if (investigador.INV_PROG_ACAD_CODI==undefined || investigador.INV_PROG_ACAD_CODI=="")
        {
          $window.alert('Seleccione PROGRAMA');
          $('#myModal').hide();  
          return;
        }

        if (investigador.INV_TICA_CODI==undefined || investigador.INV_TICA_CODI=="")
        {
          $window.alert('Seleccione TIPO CARGO');
          $('#myModal').hide();  
          return;
        }

        

        if (investigador.INV_LINK_CVLA==undefined || investigador.INV_LINK_CVLA=="")
        {
          $window.alert('Digite link del CVLAC');
          $('#myModal').hide();  
          return;
        }

        


var validaIdentificacion = TareasResource.validaExisteRegistro.query({Tabla:'sgi_inve',Campo:'inv_iden',Valor:investigador.INV_IDEN});
  
  validaIdentificacion.$promise.then(function (result){

      if (result[0].existe=="true" && oldIdentificacion!=investigador.INV_IDEN)
      {
        $window.alert('La Identificación ya existe');
        $('#myModal').hide();  
        return;
      }

      else
      {

      if(id != '0')    
      {     
        
        idInvestigador = investigador.INV_CODI;                             

        var datos =  {

        Accion: 'M',
        SQL: "UPDATE sgi_inve set  INV_IDEN = '" + investigador.INV_IDEN + "', " + 
                         " INV_TIPO_DOCU_CODI=" + investigador.INV_TIPO_DOCU_CODI + ", " +
                         " INV_NOMB='" + investigador.INV_NOMB + "', " + 
                         " inv_foto= '" + investigador.inv_foto + "', " + 
                         " INV_APEL='" + investigador.INV_APEL + "', " +
                         " INV_FECH_NACI='" + moment(new Date(investigador.INV_FECH_NACI)).format('YYYY-MM-DD')  + "', " +
                         " INV_MAIL='" + investigador.INV_MAIL + "'," +
                         " INV_TELE_CELU='" + investigador.INV_TELE_CELU  + "', " +                         
                         " INV_LINK_CVLA  = '" +  investigador.INV_LINK_CVLA.replace("http://","")   + "', " +
                         " INV_CENT_CODI = " + investigador.INV_CENT_CODI + ", " +
                         " INV_TICA_CODI = " + investigador.INV_TICA_CODI + ", " +
                         " INV_PROG_ACAD_CODI =" +  investigador.INV_PROG_ACAD_CODI + " " +                                                          
                         " WHERE INV_CODI =" + investigador.INV_CODI 

  };

   TareasResource.enviararchivo(datos).then(function(result) { 
        actualizarTablasRelacionadas(id);  
   });
  

  
                    

      }
      else
      {            
      var viewDatos2 ={
        Accion: 'I',
        SQL: id + ";sgi_inve;INV_CODI;INSERT INTO  sgi_inve (INV_CODI,INV_IDEN,INV_TIPO_DOCU_CODI, " +
        " INV_NOMB,INV_APEL,INV_FECH_NACI,INV_MAIL,INV_TELE_CELU,inv_foto,INV_CENT_CODI,INV_PROG_ACAD_CODI,INV_LINK_CVLA,INV_TICA_CODI) " + 
        " VALUES (@@,'" + investigador.INV_IDEN + "'," + investigador.INV_TIPO_DOCU_CODI + ",'" + 
        investigador.INV_NOMB + "','" + investigador.INV_APEL + "','" + moment(new Date(investigador.INV_FECH_NACI)).format('YYYY-MM-DD')  + "','" + 
        investigador.INV_MAIL + "','" + investigador.INV_TELE_CELU  + "','" + investigador.inv_foto + "'," +
        investigador.INV_CENT_CODI + "," +  investigador.INV_PROG_ACAD_CODI + ",'"+ investigador.INV_LINK_CVLA.replace("http://","") + "','" + investigador.INV_TICA_CODI + "')"
      };       

      TareasResource.enviararchivo(viewDatos2).then(function(result) { 
         idInvestigador=result.data;
            actualizarTablasRelacionadas(idInvestigador);
      });     
       
      }
    }
   }); 
  };  
 }])
