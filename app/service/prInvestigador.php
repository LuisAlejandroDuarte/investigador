<?php
  set_time_limit(0);
  require_once("config.php");  
  $d= json_decode(file_get_contents("php://input"),TRUE); 

  $Accion = $d['Accion'];


  $conexion= mysqli_connect(DB_SERVER,DB_USER,DB_PASS,DB_NAME);
  if (mysqli_connect_errno()) {
     echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  if ($Accion=="SELECT")
   {
    $SQL="SELECT INV_CODI,INV_NOMB,INV_APEL FROM sgi_inve WHERE INV_CODI_USUA=" . $d["Usuario"];

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

   if ($Accion=="SELECTLIST")
   {
    $SQL="SELECT inv_codi, CONCAT(inv_apel,' ',inv_nomb) AS Nombre FROM sgi_inve";

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


   if ($Accion=="SELECTID")
   {
    $SQL="SELECT INV.INV_CODI,INV_CODI_USUA, INV.INV_IDEN,INV.INV_TIPO_DOCU_CODI,INV.INV_NOMB,INV.INV_APEL,INV.INV_LINK_CVLA,INV_TICA_CODI, " .
    " INV.INV_FECH_NACI,INV.INV_MAIL,INV.INV_CENT_CODI,INV.INV_PROG_ACAD_CODI, " .
    " INV.INV_TELE_CELU,INV.inv_foto, ZONA.ZON_NOMB ,ESCUELA.ESC_NOMB FROM sgi_inve AS INV LEFT JOIN sgi_cent AS CENTRO ON " .
    " CENTRO.CEN_CODI = INV.INV_CENT_CODI LEFT JOIN sgi_prog_acad AS PROGRAMA ON " .
    " PROGRAMA.PAC_CODI = INV.INV_PROG_ACAD_CODI LEFT JOIN sgi_zona AS ZONA ON ZONA.ZON_CODI = CENTRO.CEN_ZONA_CODI " .
    " LEFT JOIN sgi_escu AS ESCUELA ON ESCUELA.ESC_CODI = PROGRAMA.PAC_ESCU_CODI " .
    " WHERE INV.INV_CODI =" . $d["Investigador"];

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
    
   if ($Accion=="SELECTNOMBRESINVE")
   {
    $SQL="SELECT inv_codi AS Id, CONCAT(inv_apel,' ',inv_nomb) AS Nombre FROM sgi_inve " .
    " WHERE sgi_inve.INV_CODI!=" . $d['INV_CODI'] . " AND (sgi_inve.INV_CODI_USUA!=0 or sgi_inve.INV_CODI_USUA!=null)";

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

   if ($Accion=="SELECTGRUPO")
   {
    $SQL="select I.inv_nomb As Nombre,I.inv_apel As Apellido,C.CEN_CODI AS IdCentro, C.cen_nomb As Centro,Z.zon_nomb As " .
    " ZONA,E.esc_nomb AS Escuela,P.pac_nomb AS Programa " .
    " from sgi_inve AS I INNER JOIN sgi_cent AS C ON I.inv_cent_codi = C.cen_codi INNER JOIN sgi_zona AS Z ON " .
    " Z.zon_codi=C.cen_zona_codi INNER JOIN sgi_prog_acad As P ON P.pac_codi = I.inv_prog_acad_codi INNER JOIN " .
    " sgi_escu AS E ON E.esc_codi = P.pac_escu_codi WHERE I.inv_codi=" . $d['INV_CODI'];

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


    if ($Accion=="INSERT")
    {

      
      $SQL="SELECT MAX(INV_CODI) As Maximo FROM sgi_inve";
      $resultado = mysqli_query($conexion,$SQL);
      if (mysqli_num_rows($resultado)==0 )                        
         $resultArray[]= mysqli_fetch_assoc($resultado);                                                            
      else
      {
      while ($tuple= mysqli_fetch_assoc($resultado)) {                        
            $resultArray[] = $tuple;         
         }               
      }
      
      $INV_CODI =$resultArray[0]['Maximo'] + 1;



      $SQL="INSERT INTO  sgi_inve (INV_CODI,INV_IDEN,INV_TIPO_DOCU_CODI, " .
      " INV_NOMB,INV_APEL,INV_FECH_NACI,INV_MAIL,INV_CODI_USUA,INV_PASS,INV_TELE_CELU) " .
      " VALUES (" . $INV_CODI . ",'" . $d['USE_IDEN'] . "',1,'" . 
      $d['USE_NOMB'] . "','" . $d['USE_APEL'] . "','" . $d['FECHA'] . "','" .
      $d['USE_EMAI'] . "','" . $d['IdUser'] . "','" . $d['PASS'] . "','" . $d['USE_TELE'] . "')";

      $resultArray[0]['Maximo'] = $INV_CODI;              
      $resultado = mysqli_query($conexion,$SQL);

    }


    echo json_encode($resultArray);                                                        
    mysqli_close($conexion);
   
?>