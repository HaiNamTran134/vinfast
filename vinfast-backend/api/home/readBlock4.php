<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../../config/contacts.php');
include_once('../../model/home/block4.php');

$db = new db();
$connect = $db->connect();

$Block4 = new Block4($connect);
$read = $Block4->read();

$num = $read->rowCount();

if ($num > 0) {
    $block4_array = [];
    $block4_array['data'] = [];

    while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $block4_item = array(
            'id_xe' => $id_xe,
            'image' => $image,
            'name' => $name,
            'slogan' => $slogan,
            'description1' => $description1,
            'description2' => $description2,
            'description3' => $description3,
            'description4' => $description4,
        );
        array_push($block4_array['data'], $block4_item);
    }
    echo json_encode(($block4_array));
}
