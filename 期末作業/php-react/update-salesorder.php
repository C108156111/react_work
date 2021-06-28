<?php
// update-user.php is for updating an existing user.
// Method: POST - http://localhost/php-react/update-user.php
// Required Fields: id --> EmpId, user_name --> EmpName, user_email --> JobTitle

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->seq)
    && isset($data->salesid)
    && isset($data->empid)
    && isset($data->custid)
    && isset($data->orderdate)
    && isset($data->descript)
    && is_numeric($data->seq)
    && !empty(trim($data->salesid))
    && !empty(trim($data->empid))
    && !empty(trim($data->custid))
    && !empty(trim($data->orderdate))
    && !empty(trim($data->descript)) 
   )   {   
    $seq = $data->seq;
    $salesid = mysqli_real_escape_string($db_connection, trim($data->salesid));
    $empid = mysqli_real_escape_string($db_connection, trim($data->empid));
    $custid = mysqli_real_escape_string($db_connection, trim($data->custid));
    $orderdate = mysqli_real_escape_string($db_connection, trim($data->orderdate));
    $descript = mysqli_real_escape_string($db_connection, trim($data->descript));
    $updatesales = mysqli_query($db_connection, "UPDATE `salesorder` SET `Orderid`='$salesid', `Empid`='$empid', `Custid`='$custid',`OrderDate`='$orderdate',`Descript`='$descript' WHERE `seq`='$seq'");
    if ($updatesales) {
        echo json_encode(["success" => 1, "msg" => "SalesOrder Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "SalesOrder Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>