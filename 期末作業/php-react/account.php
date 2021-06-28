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

    $empid = $data->empid;
    $phone = $data->phone;
    $account = mysqli_query($db_connection, "SELECT  employee.EmpId as empid, employee.EmpName as empname, dept.DeptName as deptname, employee.JobTitle as jobtitle 
    FROM `employee`,`dept`
    WHERE employee.DeptId=employee.DeptId
    AND `EmpId`='$empid'
    AND `Phone`='$phone'
    LIMIT 0,1");
    if ($account) {
        $account = mysqli_fetch_all($account, MYSQLI_ASSOC);
        echo json_encode(["success" => 1, "employee" => $account], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["success" => 0]);
    }

?>