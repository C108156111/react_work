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
    isset($data->salesid)
    && isset($data->empid)
    && isset($data->custid)
    && isset($data->orderdate)
    && isset($data->descript)
    && !empty(trim($data->salesid))
    && !empty(trim($data->empid))
    && !empty(trim($data->custid))
    && !empty(trim($data->orderdate))
    && !empty(trim($data->descript))         
) {
    $salesid = mysqli_real_escape_string($db_connection, trim($data->salesid));
    $empid = mysqli_real_escape_string($db_connection, trim($data->empid));
    $custid = mysqli_real_escape_string($db_connection, trim($data->custid));
    $orderdate = mysqli_real_escape_string($db_connection, trim($data->orderdate));
    $descript = mysqli_real_escape_string($db_connection, trim($data->descript));
    $insertsales = mysqli_query($db_connection, "INSERT INTO `salesorder`(`Orderid`,`Empid`,`Custid`,`OrderDate`,`Descript`) VALUES('$salesid','$empid','$custid','$orderdate','$descript')");
    if ($insertsales) {
        $last_id = mysqli_insert_id($db_connection);
        echo json_encode(["success" => 1, "msg" => "SalesOrder Inserted.", "id" => $last_id]);
    } else {
        echo json_encode(["success" => 0, "msg" => "SalesOrder Not Inserted!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>