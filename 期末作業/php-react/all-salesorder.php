
<?php
    // all-users.php is to fetch all users that exist in the database.
    // Method: GET - http://localhost/php-react/all-users.php
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    // DB connection: $db_connection from db_connection.php
    require 'db_connection.php';
    
    $allsales = mysqli_query($db_connection, "SELECT seq as seq, Orderid as salesid, Empid as empid, Custid as custid, OrderDate as orderdate, Descript as descript FROM `salesorder`");
    if (mysqli_num_rows($allsales) > 0) {
        $allsales = mysqli_fetch_all($allsales, MYSQLI_ASSOC);
        // json_encode([],JSON_UNESCAPED_UNICODE) 參數一定要加才會正確顯示中文
        echo json_encode(["success" => 1, "salesorders" => $allsales], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["success" => 0]);
    }
?>
    
