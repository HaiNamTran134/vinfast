<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');

include_once('../../config/contacts.php');
include_once('../../model/home/block3.php');

$db = new db();
$connect = $db->connect();

$block3 = new Block3($connect); 

$block3->id_xe = isset($_GET['id_xe']) ? $_GET['id_xe'] : die();

$block3->show();
 
$block3_item = array(
    'id_xe' => $block3->id_xe,
    'slug' => $block3->slug,
    'dongxe' => $block3->dongxe,
    'slogan' => $block3->slogan,
    'name' => $block3->name,
    'description1' => $block3->description1, 
    'description2' => $block3->description2,
    'description3' => $block3->description3,
    'description4' => $block3->description4,
    'image' => $block3->image,
);

print_r(json_encode($block3_item));
