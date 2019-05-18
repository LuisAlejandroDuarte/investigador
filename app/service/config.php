<?php

// foreach ($_SERVER as $key => $value) {
//     if (strpos($key, "MYSQLCONNSTR_localdb") !== 0) {
//         continue;
//     }
    
//     $connectstr_dbhost = preg_replace("/^.*Data Source=(.+?);.*$/", "\\1", $value);
//     $connectstr_dbname = preg_replace("/^.*Database=(.+?);.*$/", "\\1", $value);
//     $connectstr_dbusername = preg_replace("/^.*User Id=(.+?);.*$/", "\\1", $value);
//     $connectstr_dbpassword = preg_replace("/^.*Password=(.+?)$/", "\\1", $value);
// }


define('DB_SERVER','guane-mysqldbserver.mysql.database.azure.com');
define('DB_NAME','grupogua_investigador');
 // define('DB_USER','root');
 // define('DB_PASS','');
define('DB_USER','guane@guane-mysqldbserver');
define('DB_PASS','MbCj199803#');

// define('DB_SERVER','localhost');
// define('DB_NAME','grupogua_investigador');
//  // define('DB_USER','root');
//  // define('DB_PASS','');
// define('DB_USER','grupogua_jmedicru');
// define('DB_PASS','MbCj199803#');

?>