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
    isset($data->prodid)
    && isset($data->prodname)
    && isset($data->prodprice)
    && isset($data->prodcost)
    && !empty(trim($data->prodid))
    && !empty(trim($data->prodname))
    && !empty(trim($data->prodprice))
    && !empty(trim($data->prodcost))    
) {
    $prodid = mysqli_real_escape_string($db_connection, trim($data->prodid));
    $prodname = mysqli_real_escape_string($db_connection, trim($data->prodname));
    $prodprice = mysqli_real_escape_string($db_connection, trim($data->prodprice));
    $prodcost = mysqli_real_escape_string($db_connection, trim($data->prodcost));
    $insertprod = mysqli_query($db_connection, "INSERT INTO `product`(`ProdID`,`ProdName`,`UnitPrice`,`Cost`) VALUES('$prodid','$prodname','$prodprice','$prodcost')");
    if ($insertprod) {
        $last_id = mysqli_insert_id($db_connection);
        echo json_encode(["success" => 1, "msg" => "Product Inserted.", "id" => $last_id]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Product Not Inserted!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>