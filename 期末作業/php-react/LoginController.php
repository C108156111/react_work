<?php
require_once './Controller.php';
require "vendor/autoload.php";
use \Firebase\JWT\JWT;

class LoginController extends Controller{
    public function checkToken(){
        $headers = getallheaders();
        $jwt = $headers["Authorization"];
        $secret_key = "C108156111";
        try{
            $decode = JWT::decode($jwt,$secret_key,array('HS256'));
            return $this->response(200,"Token alive");;
        }catch(Exception $e){
            return $this->response(401,"Token invalid");
        }
    }
    public function doLogin(){
        $id=$_POST['id'];
        $password=$_POST['password'];
        //查詢DB驗證帳密的正確性
        $secret_key="C108156111";
        $issuer_claim="http://localhost";
        $audience_claim="http://localhost";
        $issuedat_claim=time();
        $expire_claim=$issuedat_claim + 30;
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
        return $this->response(200,"Token established",$jwt);
    }
}

?>