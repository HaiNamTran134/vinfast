<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');

include_once('../../config/contacts.php');
include_once('../../model/home/block4.php');

$db = new db();
$connect = $db->connect();

$block4 = new Block4($connect); 

$block4->id_xe = isset($_GET['id_xe']) ? $_GET['id_xe'] : die();

$block4->show();
 
$block4_item = array(
    'id_xe' => $block4->id_xe,
    'image' => $block4->image,
    'name' => $block4->name,
    'slogan' => $block4->slogan,
    'description1' => $block4->description1, 
    'description2' => $block4->description2,
    'description3' => $block4->description3,
    'description4' => $block4->description4,
);

print_r(json_encode($block4_item));
