<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');

include_once('../../config/contacts.php');
include_once('../../model/admin/products.php');

$db = new db();
$connect = $db->connect();

$product = new Product($connect);

$product->id = isset($_GET['id']) ? $_GET['id'] : die();

$product->show();

$product_item = array(
    'id' => $product->id,
    'name' => $product->name,
    'count' => $product->count,
    'image' => $product->image,
    'color' => $product->color,
    'price' => $product->price,
    'deposits' => $product->deposits,
);

print_r(json_encode($product_item));
