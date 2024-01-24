<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../../config/contacts.php');
include_once('../../model/admin/products.php');

$db = new db();
$connect = $db->connect();

$product = new Product($connect);
$read = $product->read();

$num = $read->rowCount();

if ($num > 0) {
    $product_array = [];
    $product_array['data'] = [];

    while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $product_item = array(
            'id' => $id,
            'name' => $name,
            'count' => $count,
            'image' => $image,
            'color' => $color,
            'price' => $price,
            'deposits' => $deposits,
        );
        array_push($product_array['data'], $product_item);
    }
    echo json_encode(($product_array));
}
