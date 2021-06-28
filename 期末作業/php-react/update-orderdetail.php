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
    && isset($data->OrderId)
    && isset($data->prodid)
    && isset($data->qty)
    && isset($data->discount)
    && is_numeric($data->seq)
    && !empty(trim($data->OrderId))
    && !empty(trim($data->prodid))
    && !empty(trim($data->qty))
    && !empty(trim($data->discount))  
) {
    $seq = $data->seq;
    $OrderId = mysqli_real_escape_string($db_connection, trim($data->OrderId));
    $prodid = mysqli_real_escape_string($db_connection, trim($data->prodid));
    $qty = mysqli_real_escape_string($db_connection, trim($data->qty));
    $discount = mysqli_real_escape_string($db_connection, trim($data->discount));
    $updatedetail = mysqli_query($db_connection, "UPDATE `orderdetail` SET `OrderId`='$OrderId', `ProdId`='$prodid',`Qty`='$qty',`Discount`='$discount' WHERE `seq`='$seq'");
    if ($updatedetail) {
        echo json_encode(["success" => 1, "msg" => "Detail Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Detail Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>