<?php
  set_time_limit(0);
  require_once("config.php");  
  $d= json_decode(file_get_contents("php://input"),TRUE); 

  $Accion = $d['Accion'];  

  $conexion= mysqli_connect(DB_SERVER,DB_USER,DB_PASS,DB_NAME);
  if (mysqli_connect_errno()) {
     echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  if ($Accion=='DELETEPROYECTOS')
  {
    $SQL="DELETE FROM sgi_prod_proy WHERE id_proy=" . $d['idProy'] . " AND id_inve=" . $d['idInve'] ;

    $resultArray = array(); 
  	$resultado = mysqli_query($conexion,$SQL);
    // if (mysqli_num_rows($resultado)==0 )                        
    //     $resultArray[]= mysqli_fetch_assoc($resultado);                                                            
    // else
    // {
    //  while ($tuple= mysqli_fetch_assoc($resultado)) {                        
    //        $resultArray[] = $tuple;         
    //     }               
    // }
  }
  
  if ($Accion=="SelectProyectoProducto")
   {
    $SQL="select tp.Descripcion AS NombreTipoProducto, pr.id AS IdProducto,pr.id_tipo AS IdTipoProducto,pr.Nombre As NombreProducto, " . 
    " pp.titulo AS TituloProducto ,pp.fecha AS Fecha ,'false' As Sel " .
    " FROM  sgi_prod AS pr INNER JOIN sgi_tipo_prod AS tp ON (tp.id = pr.id_tipo) " .
    " INNER JOIN sgi_prod_proy AS pp ON (pp.id_prod=pr.id) " .
    " WHERE pp.id_proy =" . $d['IdProyecto'] . " AND pp.id_inve="  . $d['IdInve'] ;

    $resultArray = array(); 
  	$resultado = mysqli_query($conexion,$SQL);
    if (mysqli_num_rows($resultado)==0 )                        
        $resultArray[]= mysqli_fetch_assoc($resultado);                                                            
    else
    {
     while ($tuple= mysqli_fetch_assoc($resultado)) {                        
           $resultArray[] = $tuple;         
        }               
    }
   }
    
    if ($Accion=="SELECTPRODUCTOPROYECTO")
    {
     $SQL="SELECT P.nombre,P.Id FROM sgi_prod_proy As PP INNER JOIN sgi_prod AS P ON P.Id = PP.id_prod WHERE " .
     " PP.id_proy =" . $d['PRO_CODI'];
 
     $resultArray = array(); 
      $resultado = mysqli_query($conexion,$SQL);
     if (mysqli_num_rows($resultado)==0 )                        
         $resultArray[]= mysqli_fetch_assoc($resultado);                                                            
     else
     {
      while ($tuple= mysqli_fetch_assoc($resultado)) {                        
            $resultArray[] = $tuple;         
         }               
     }
   }

   


   if ($Accion=="DELETEPROYECTO")
   {
    $SQL="DELETE FROM sgi_prod_proy where id_proy=" . $d['Codigo'];

    $resultArray = array(); 
    $resultado = mysqli_query($conexion,$SQL);
    
  }
  


  if ($Accion=="DELETEPROYECTO2")
   {
    $SQL="DELETE FROM sgi_prod_inve where id_proy="  . $d['Codigo'];

    $resultArray = array(); 
    $resultado = mysqli_query($conexion,$SQL);
    
  }

  if ($Accion=="DELETEPROYECTO3")
   {
    $SQL="DELETE FROM sgi_proy_inve where id_proy=" . $d['Codigo'];

    $resultArray = array(); 
    $resultado = mysqli_query($conexion,$SQL);
    
  }

  if ($Accion=="DELETEPROYECTO4")
   {
    $SQL="DELETE FROM sgi_proy where pro_codi=" . $d['Codigo'];

    $resultArray = array(); 
    $resultado = mysqli_query($conexion,$SQL);
    
  }
   
   mysqli_close($conexion);
    echo json_encode($resultArray);                                                        
    
   
?>