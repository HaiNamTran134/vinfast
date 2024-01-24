<?php
header('Access-Control-Allow-Origin: ');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');

include_once('../../config/contacts.php');
include_once('../../model/home/banner.php');

$db = new db();
$connect = $db->connect();

$banner = new Banner($connect);

$banner->id = isset($_GET['id']) ? $_GET['id'] : die();

$banner->show();

$banner_item = array(
    'id' => $banner->id,
    'placement' => $banner->placement,
    'banner' => $banner->banner,
);

print_r(json_encode($banner_item));
