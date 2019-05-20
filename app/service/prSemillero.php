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
    $SQL="SELECT sem_codi,sem_nomb FROM sgi_semi";

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


   if ($Accion=="SelectSemilleroInvestigacion")
   {
    $SQL="SELECT semillero.sem_nomb As NombreSemillero,semillero.sem_codi As IdSemillero, inve_semi.INS_fech_inic As FechaInicio," . 
    " inve_semi.ins_fech_term As FechaTermina,'false' As Sel FROM  sgi_inve_semi as inve_semi INNER JOIN  " . 
    " sgi_semi as semillero on semillero.sem_codi = inve_semi.ins_semi_codi  WHERE  inve_semi.ins_inve_iden=" . $d['IdInve'] . 
    " UNION  " . 
    " SELECT semillero.sem_nomb As NombreSemillero,semillero.sem_codi As IdSemillero, inve_semi.INS_FECH_INIC As FechaInicio, " . 
    " inve_semi.INS_FECH_TERM As FechaTermina,'false' As Sel FROM sgi_inve_semi as inve_semi INNER JOIN  " . 
    " sgi_semi as semillero on semillero.sem_codi = inve_semi.INS_SEMI_CODI  WHERE  inve_semi.INS_INVE_IDEN="  . $d['IdInve'];

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