<?php
header("Access-Control-Allow-Origin:*");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Request-With");

include_once('../../config/contacts.php');
include_once('../../model/home/block2.php');

$db = new db();
$connect = $db->connect();

$block2 = new Block2($connect);

$data = json_decode(file_get_contents("php://input"));

$block2->id = $data->id;
$block2->quote = $data->quote;
$block2->author = $data->author;


if ($block2->update()) {
    echo json_encode(array('message', 'User Updated'));
} else {
    echo json_encode(array('message', 'User Not Updated'));
}
