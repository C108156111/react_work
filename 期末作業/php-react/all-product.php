
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
    
    $allprods = mysqli_query($db_connection, "SELECT ProdID as prodid, ProdName as prodname, UnitPrice as prodprice , Cost as prodcost FROM `product`");
    if (mysqli_num_rows($allprods) > 0) {
        $allprods = mysqli_fetch_all($allprods, MYSQLI_ASSOC);
        // json_encode([],JSON_UNESCAPED_UNICODE) 參數一定要加才會正確顯示中文
        echo json_encode(["success" => 1, "products" => $allprods], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["success" => 0]);
    }
?>
    
