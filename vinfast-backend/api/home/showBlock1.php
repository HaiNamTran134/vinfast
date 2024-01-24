<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');

include_once('../../config/contacts.php');
include_once('../../model/home/block1.php');

$db = new db();
$connect = $db->connect();

$block1 = new Block1($connect); 

$block1->id = isset($_GET['id']) ? $_GET['id'] : die();

$block1->show();
 
$block1_item = array(
    'id' => $block1->id,
    'title' => $block1->title,
    'description' => $block1->description,
    'image' => $block1->image,
);

print_r(json_encode($block1_item));
