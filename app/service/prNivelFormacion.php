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
    $SQL="SELECT NIV_CODI,NIV_NOMB FROM sgi_nive_form";

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
    mysqli_close($conexion);
    echo json_encode($resultArray);                                                        
   }

   if ($Accion=="SelectNivelFormId_inve")
   {
    $SQL="SELECT SNI.NIN_NIV_CODI AS Codi,SNI.NIN_TITU_OBTE AS titulo,SNI.NIN_INST As Instituto, " .
    " SNI.NIN_AGNO AS Agno, Concat(SNF.NIV_NOMB,' ', SNI.NIN_TITU_OBTE, ' ',SNI.NIN_INST, ' ',SNI.NIN_AGNO) As Nombre,'false' As Sel " .
    " FROM sgi_nive_inve AS SNI INNER JOIN sgi_nive_form AS SNF ON SNF.NIV_CODI = SNI.NIN_NIV_CODI  where " .
    " SNI.NIN_INV_CODI =" . $d['IdInve'];

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
   
    echo json_encode($resultArray);                                                        
    mysqli_close($conexion);
   }

?>