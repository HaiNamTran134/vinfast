<?php

header("Access-Control-Allow-Origin:*");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Request-With");

include_once('../../config/contacts.php');
include_once('../../model/user/Account.php');

$db = new db();
$connect = $db->connect();

$account = new Account($connect);

$account->id = isset($_GET['id']) ? $_GET['id'] : die();

$account->delete();

// $data = json_decode(file_get_contents("php://input"));

// $account->id = $data->id;

if ($account->delete()) {
    echo json_encode(array('message', 'User Deleted'));
} else {
    echo json_encode(array('message', 'User Not Deleted'));
}
