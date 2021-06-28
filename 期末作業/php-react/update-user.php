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
    isset($data->id)
    && isset($data->user_name)
    && isset($data->user_email)
    && is_numeric($data->id)
    && !empty(trim($data->user_name))
    && !empty(trim($data->user_email))
) {
    $username = mysqli_real_escape_string($db_connection, trim($data->user_name));
    $useremail = mysqli_real_escape_string($db_connection, trim($data->user_email));
    $updateUser = mysqli_query($db_connection, "UPDATE `employee` SET `EmpName`='$username', `JobTitle`='$useremail' WHERE `EmpId`='$data->id'");
    if ($updateUser) {
        echo json_encode(["success" => 1, "msg" => "User Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "User Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>