<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../../config/contacts.php');
include_once('../../model/home/block3.php');

$db = new db();
$connect = $db->connect();

$Block3 = new Block3($connect);
$read = $Block3->read();

$num = $read->rowCount();

if ($num > 0) {
    $block3_array = [];
    $block3_array['data'] = [];

    while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $block3_item = array(
            'id_xe' => $id_xe,
            'slug' => $slug,
            'dongxe' => $dongxe,
            'slogan' => $slogan,
            'name' => $name,
            'description1' => $description1,
            'description2' => $description2,
            'description3' => $description3,
            'description4' => $description4,
            'image' => $image,
        );
        array_push($block3_array['data'], $block3_item);
    }
    echo json_encode(($block3_array));
}
