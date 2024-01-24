<?php
header("Access-Control-Allow-Origin:*");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Request-With");

include_once('../../config/contacts.php');
include_once('../../model/user/Account.php');

$db = new db();
$connect = $db->connect();

$account = new Account($connect);

// $data = json_decode(file_get_contents("php://input"));

$account->id = $_POST("id");
$account->name = $_POST("name") ;
$account->phone = $_POST("phone") ;
$account->email = $_POST("email") ;
$account->password = $_POST("password");
$account->role = $_POST("role");
if ($account->update()) {
    echo json_encode(array('message', 'Account Updated'));
} else {
    echo json_encode(array('message', 'Account Not Updated'));
}
