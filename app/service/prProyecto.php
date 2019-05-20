<?php
  set_time_limit(0);
  require_once("config.php");  
  $d= json_decode(file_get_contents("php://input"),TRUE); 

  $Accion = $d['Accion'];  

  $conexion= mysqli_connect(DB_SERVER,DB_USER,DB_PASS,DB_NAME);
  if (mysqli_connect_errno()) {
     echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  if ($Accion=="INSERT")
   {
    $SQL="INSERT INTO sgi_proy  (PRO_NOMB,PRO_FINA) " .
    " VALUES ('" . $d['Nombre'] . "'," .  $d['Financiacion'] . ")";



    $resultArray = array(); 
  	$resultado = mysqli_query($conexion,$SQL);
    // if ($resultado==true)                        
    //     $resultArray[]= mysqli_fetch_assoc($resultado);                                                            
    // else
    // {
    //  while ($tuple= mysqli_fetch_assoc($resultado)) {                        
    //        $resultArray[] = $tuple;         
    //     }               
    // }
    $SQL="SELECT MAX(PRO_CODI) As Max from sgi_proy";
    $resultado = mysqli_query($conexion,$SQL);
    $resultArray[]= mysqli_fetch_assoc($resultado);         
   } 

   if ($Accion=="SELECTPROYECTOINVESTIGADOR")
   {
    $SQL="SELECT IG.igr_codi AS Id,I.inv_codi AS Id2, CONCAT(I.inv_apel,'',I.inv_nomb) AS Nombre," .
    " IG.igr_fech_inic AS FechaInicia,IG.igr_fech_term AS FechaTermina,IG.igr_tipo_vinc_codi AS IdVincula, " . 
    " 2 AS Tipo FROM " .
    " sgi_grup As G INNER JOIN sgi_inve_grup AS IG ON " .
    " G.gru_codi = IG.igr_grup_codi INNER JOIN sgi_inve AS I ON " .
    " I.inv_codi = IG.igr_inve_iden " .
    " WHERE IG.igr_grup_codi = " . $d['IdGrupo'];

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

   if ($Accion=="SELECTGRUPOPROYECTO")
   {
    $SQL="SELECT PROY.PRO_NOMB As NombreProyecto,PROD.Nombre AS NombreProducto,PROD.Id As IdProd,PROY.PRO_CODI AS IdProy," .
    " GP.fech_ini,GP.fech_term,GP.id_grup AS IdGrupo " .
    " FROM sgi_grup_proy As GP INNER JOIN sgi_proy As PROY ON PROY.PRO_CODI = GP.id_proy " .
    " INNER JOIN sgi_prod AS PROD ON PROD.Id=GP.id_prod WHERE  GP.Id_grup=" + $d['IdGrupo'] . " AND GP.Id_inve=" .  $d['INV_CODI'];

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

   if ($Accion=="SELECTPROYECTOINVESTIGADOR")
   {
    $SQL="SELECT P.pro_nomb,P.pro_codi FROM sgi_proy As P INNER JOIN sgi_proy_inve AS PI ON P.pro_codi = PI.id_proy WHERE " .
    " PI.id_inve IN (" . $d['idInve'] . ")";

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


    echo json_encode($resultArray);                                                        
    mysqli_close($conexion);
   
?>