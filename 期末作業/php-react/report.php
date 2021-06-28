
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
    
    $allreport = mysqli_query($db_connection, "SELECT salesorder.CustId as custid, customer.CustName as custname, 
    SUM(orderdetail.Qty*product.UnitPrice*orderdetail.Discount) as income ,
    sum(orderdetail.Qty*(product.UnitPrice-product.Cost)) as profit FROM `product`,`orderdetail`,`salesorder`,`customer`
    WHERE orderdetail.OrderId=salesorder.OrderId AND orderdetail.ProdId=product.ProdID AND customer.CustId=salesorder.CustId 
    GROUP BY orderdetail.OrderId,salesorder.CustId");
    if (mysqli_num_rows($allreport) > 0) {
        $allreport = mysqli_fetch_all($allreport, MYSQLI_ASSOC);
        // json_encode([],JSON_UNESCAPED_UNICODE) 參數一定要加才會正確顯示中文
        echo json_encode(["success" => 1, "report" => $allreport], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["success" => 0]);
    }
?>
    
