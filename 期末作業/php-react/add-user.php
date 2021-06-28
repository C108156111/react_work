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
    isset($data->user_name)
    && isset($data->user_email)
    && !empty(trim($data->user_name))
    && !empty(trim($data->user_email))
) {
    $username = mysqli_real_escape_string($db_connection, trim($data->user_name));
    $useremail = mysqli_real_escape_string($db_connection, trim($data->user_email));
    $insertUser = mysqli_query($db_connection, "INSERT INTO `employee`(`EmpName`,`JobTitle`) VALUES('$username','$useremail')");
    if ($insertUser) {
        $last_id = mysqli_insert_id($db_connection);
        echo json_encode(["success" => 1, "msg" => "User Inserted.", "id" => $last_id]);
    } else {
        echo json_encode(["success" => 0, "msg" => "User Not Inserted!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>