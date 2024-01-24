<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');

include_once('../../config/contacts.php');
include_once('../../model/home/block2.php');

$db = new db();
$connect = $db->connect();

$block2 = new Block2($connect); 

$block2->id = isset($_GET['id']) ? $_GET['id'] : die();

$block2->show();
 
$block2_item = array(
    'id' => $block2->id,
    'quote' => $block2->quote,
    'author' => $block2->author,
);

print_r(json_encode($block2_item));
