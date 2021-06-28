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
    isset($data->prodid)
    && isset($data->prodname)
    && isset($data->prodprice)
    && isset($data->prodcost)
    && is_numeric($data->prodid)
    && !empty(trim($data->prodname))
    && !empty(trim($data->prodprice))
    && !empty(trim($data->prodcost))    
) {
    $prodid = $data->prodid;
    $prodname = mysqli_real_escape_string($db_connection, trim($data->prodname));
    $prodprice = mysqli_real_escape_string($db_connection, trim($data->prodprice));
    $prodcost = mysqli_real_escape_string($db_connection, trim($data->prodcost));
    $updateprod = mysqli_query($db_connection, "UPDATE `product` SET `ProdName`='$prodname', `UnitPrice`='$prodprice',`Cost`='$prodcost' WHERE `ProdID`='$prodid'");
    if ($updateprod) {
        echo json_encode(["success" => 1, "msg" => "Product Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Product Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>