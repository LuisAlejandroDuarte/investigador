<?php
  set_time_limit(0);
  require_once("config.php");  
  $d= json_decode(file_get_contents("php://input"),TRUE); 

  $Accion = $d['Accion'];
  $Usuario= $d['Usuario'];
  $Clave= $d['Clave'];

  $conexion= mysqli_connect(DB_SERVER,DB_USER,DB_PASS,DB_NAME,3306);
  if (mysqli_connect_errno()) {
     echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  if ($Accion=="Iniciar")
   {
    $SQL="SELECT USE_COD_TIPO AS Id_tipo,USE_CODI AS Id,USE_USUA AS Usuario," .
    " concat(USE_NOMB,' ',USE_APEL) AS Nombre FROM sgi_user WHERE USE_USUA ='" . $Usuario . "' AND USE_CLAV ='" . $Clave . "'";

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