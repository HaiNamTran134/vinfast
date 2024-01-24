<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../../config/contacts.php');
include_once('../../model/home/block1.php');

$db = new db();
$connect = $db->connect();

$Block1 = new Block1($connect);
$read = $Block1->read();

$num = $read->rowCount();

if ($num > 0) {
    $block1_array = [];
    $block1_array['data'] = [];

    while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $block1_item = array(
            'id' => $id,
            'title' => $title,
            'description' => $description,
            'image' => $image,
        );
        array_push($block1_array['data'], $block1_item);
    }
    echo json_encode(($block1_array));
}
