<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../../config/contacts.php');
include_once('../../model/product.php');

$db = new db();
$connect = $db->connect();

$product = new Product($connect);
$read = $product->read();

$num = $read->rowCount();

if ($num > 0) {
    $list_car_array = [];
    $list_car_array['data'] = [];

    while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $list_car_item = array(
            'id_question' => $id_xe,
            'slug' => $slug,
            'dongxe' => $dongxe,
            'slogan' => $slogan,
            'name' => $name,
            'des' => $description,
            'logo' => $logo,
            'logoVin' => $logoVin,
            'img' => $image,
        );
        array_push($list_car_array['data'], $list_car_item);
    }
    echo json_encode(($list_car_array));
}
