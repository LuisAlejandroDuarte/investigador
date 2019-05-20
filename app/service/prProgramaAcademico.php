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
    $SQL="SELECT PAC_CODI,PAC_NOMB FROM sgi_prog_acad";

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

   if ($Accion=="SELECT2")
   {
    $SQL="SELECT ESCUELA.ESC_NOMB FROM sgi_prog_acad AS PROGRAMA INNER JOIN " .
    " sgi_escu AS ESCUELA ON  PROGRAMA.PAC_ESCU_CODI = ESCUELA.ESC_CODI WHERE " .
    " PROGRAMA.PAC_CODI =" . $d['idPrograma']; 

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