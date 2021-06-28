<?php
require "vendor/autoload.php";
use \Firebase\JWT\JWT;

$id=$_POST['id'];
$password=$_POST['password'];
//查詢DB驗證帳密的正確性
$secret_key="C108156111";
$issuer_claim="http://localhost";
$audience_claim="http://localhost";
$issuedat_claim=time();
$expire_claim=$issuedat_claim + 10;
$payload=array(
    "iss" => $issuer_claim,
    "aud" => $audience_claim,
    "iat" => $issuedat_claim,
    "exp" => $expire_claim,
    "data" => array(
        "id" => $id,
    )
);
$jwt = JWT::encode($payload,$secret_key);
//標準化輸出
echo $jwt;
?>