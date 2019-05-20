<?php
  set_time_limit(0);
  require_once("config.php");  
  $d= json_decode(file_get_contents("php://input"),TRUE); 

  $Accion = $d['Accion'];  
  $resultArray = array(); 

  $conexion= mysqli_connect(DB_SERVER,DB_USER,DB_PASS,DB_NAME);
  if (mysqli_connect_errno()) {
     echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  if ($Accion=="SELECTBYIDINVE")
   {
    $SQL="SELECT G.gru_codi As IdGrupo ,G.gru_nomb AS NombreGrupo  FROM sgi_grup AS G INNER JOIN sgi_inve_grup AS IG ON IG.IGR_GRUP_CODI=G.gru_codi WHERE " .
    " IG.IGR_INVE_IDEN=" .  $d['IdInve'];

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
    $SQL="SELECT grupo.gru_nomb As NombreGrupo,grupo.gru_codi As IdGrupo," .                           
    " inve_grup.igr_fech_inic As FechaInicio,inve_grup.igr_fech_term As FechaTermina,'false' As Sel FROM  sgi_inve_grup as inve_grup INNER JOIN " .
    " sgi_grup as grupo on grupo.gru_codi = inve_grup.igr_grup_codi " .
    " WHERE  inve_grup.igr_inve_iden=" .  $d['IdInve'];

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
  
    if ($Accion=="SELECTCOUNTGRUPOINVE")
    {
     $SQL="SELECT Count(IGR_GRUP_CODI) As Count FROM sgi_inve_grup " .
     " WHERE IGR_GRUP_CODI=" . $d['Codigo'] . " AND IGR_FECH_TERM is null AND " .
     " IGR_INVE_IDEN<>" . $d['INV_CODI'];
 
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

    if ($Accion=="SELECTCOUNTGRUPOLINEA")
    {
     $SQL="SELECT Count(gli_codi) As Count FROM sgi_grup_line_inve " . 
     " WHERE gli_grup_codi=" . $d['Codigo'] . " AND  gli_fech_term is null";
 
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
    if ($Accion=="SELECTCOUNTGRUPOSEMILLA")
    {
     $SQL="SELECT Count(sgr_codi) As Count FROM sgi_grup_semi WHERE " . 
     " sgr_grup_codi=" .  $d['Codigo'] . " AND  sgr_fech_term is null";
 
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

    if ($Accion=="SELECTCOUNTGRUPOPROYECTO")
    {
     $SQL="SELECT Count(id_proy) As Count FROM sgi_grup_proy WHERE " .
     " id_grup=" . $d['Codigo'] . " AND fech_term is null";
 
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

    if ($Accion=="SELECTCOUNTPROGRUPO")
    {
     $SQL="SELECT Count(pgr_plnt_codi) As Count FROM sgi_plnt_grup WHERE " . 
     " pgr_grup_codi=" . $d['Codigo'] . " AND pgr_fech_term is null";
 
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

    if ($Accion=="SELECT1")
    {
     $SQL="SELECT IG.igr_codi,G.gru_nomb AS Grupo,G.gru_codi, G.gru_colc_codi,G.gru_cate_colc, I.inv_codi,G.gru_aval_inst," .
     " G.gru_fech_ini AS Fecha,CONCAT(I.inv_nomb,' ',I.inv_apel) As Nombre,G.gru_area_codi As selArea,G.gru_cent_codi As selCentro " .
     " FROM sgi_inve_grup AS IG  INNER JOIN sgi_grup AS G ON G.gru_codi = IG.igr_grup_codi " .
     " INNER JOIN sgi_inve As I ON I.inv_codi = IG.igr_inve_iden WHERE G.gru_codi =" . $d['IdGrupo'];
 
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

    if ($Accion=="SELECTGRUPOINVESTIGADOR")
    {
     $SQL="SELECT P.pro_nomb,P.pro_codi FROM sgi_proy As P INNER JOIN sgi_proy_inve AS PI ON P.pro_codi = PI.id_proy WHERE " .
     " PI.id_inve IN (" . $d['IdInve'] . ")";
 
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

    if ($Accion=="SELECTPLNTGRUPO")
    {
     $SQL="SELECT pgr_plnt_codi As Id, pgr_path As Path,pgr_fech_inic As FechaInicio,pgr_fech_term AS FechaTermina,pgr_grup_codi As IdGrupo, " .
     " pgr_plnt_codi,pgr_nombre As Nombre FROM sgi_plnt_grup WHERE pgr_grup_codi=" . $d['IdGrupo'];
 
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

    
    if ($Accion=="SELECTGRUPOSEMILLA")
    {
     $SQL="SELECT GS.sgr_codi AS Id, S.sem_nomb AS Nombre,GS.sgr_fech_inic As FechaInicia, " .
     " GS.sgr_fech_term As FechaTermina, S.sem_codi AS Id2,3 As Tipo FROM " .
     " sgi_grup As G INNER JOIN sgi_grup_semi AS GS ON " .
     " G.gru_codi = GS.sgr_grup_codi INNER JOIN sgi_semi AS S ON " .
     " S.sem_codi = GS.sgr_semi_codi " .
     " WHERE GS.sgr_grup_codi = " . $d['idGrupo'];
 
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

      
    if ($Accion=="DELETEGLIGRUPOCODI")
    {
     $SQL="DELETE FROM sgi_grup_line_inve WHERE gli_grup_codi=" . $d['idGrupo'];
 
     $resultArray = array(); 
     $resultado = mysqli_query($conexion,$SQL);
        

    }


    echo json_encode($resultArray);                                                        
    mysqli_close($conexion);
   

?>