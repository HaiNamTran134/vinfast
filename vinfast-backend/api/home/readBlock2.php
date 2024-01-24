<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../../config/contacts.php');
include_once('../../model/home/block2.php');

$db = new db();
$connect = $db->connect();

$Block2 = new Block2($connect);
$read = $Block2->read();

$num = $read->rowCount();

if ($num > 0) {
    $block2_array = [];
    $block2_array['data'] = [];

    while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $block2_item = array(
            'id' => $id,
            'quote' => $quote,
            'author' => $author,
        );
        array_push($block2_array['data'], $block2_item);
    }
    echo json_encode(($block2_array));
}
