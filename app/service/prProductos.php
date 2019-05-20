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
    $SQL="SELECT PI.id_grupo,PI.id_tipoInvestigador,PI.id_convocatoria,PI.id_linea, " .
    " P.PRO_CODI, P.PRO_NOMB, P.PRO_FINA,PI.fecha_ini,PI.fecha_ter FROM sgi_proy_inve AS PI INNER JOIN sgi_inve AS I ON I.INV_CODI =PI.id_inve INNER JOIN sgi_proy AS P ON  " . 
    " P.PRO_CODI=PI.id_proy WHERE  PI.id_inve=" . $d['IdInvestigador'];

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