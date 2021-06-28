<?php
// add-user.php is for inserting new users into the database.
// Method: POST - http://localhost/php-react/add-user.php
// Required Fields – user_name --> EmpName, user_email --> JobTitle

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->seq)
    && isset($data->OrderId)
    && isset($data->prodid)
    && isset($data->qty)
    && isset($data->discount)
    && !empty(trim($data->seq))
    && !empty(trim($data->OrderId))
    && !empty(trim($data->prodid))
    && !empty(trim($data->qty))
    && !empty(trim($data->discount))       
) {
    $seq = mysqli_real_escape_string($db_connection, trim($data->seq));
    $OrderId = mysqli_real_escape_string($db_connection, trim($data->OrderId));
    $prodid = mysqli_real_escape_string($db_connection, trim($data->prodid));
    $qty = mysqli_real_escape_string($db_connection, trim($data->qty));
    $discount = mysqli_real_escape_string($db_connection, trim($data->discount));
    $insertdetail = mysqli_query($db_connection, "INSERT INTO `orderdetail`(`seq`,`OrderId`,`ProdId`,`Qty`,`Discount`) VALUES('$seq','$OrderId','$prodid','$qty','$discount')");
    if ($insertdetail) {
        $last_id = mysqli_insert_id($db_connection);
        echo json_encode(["success" => 1, "msg" => "Detail Inserted.", "id" => $last_id]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Detail Not Inserted!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>