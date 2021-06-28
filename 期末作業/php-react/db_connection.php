<?php
$db_host = 'localhost';
$db_user = 'C108156111';  // 改成你的資料庫帳號
$db_password = 'D223044846';  // 改成你的資料庫密碼
$db_name = 'mmisdb';   // 案例資料庫

$db_connection = mysqli_connect($db_host, $db_user, $db_password, $db_name);

// CHECKING THE DATABASE CONNECTION
if(mysqli_connect_errno()) {
    echo "Connection Failed".mysqli_connect_error();
    exit;
}
else {
    // 設定 mysqli 資料庫連結編碼
    mysqli_query($db_connection,"set names utf8");
    // 檢查用，如果 echo 成功訊息會讓 fetch 誤判
    // echo "The database is successfully connected";
}
?>
