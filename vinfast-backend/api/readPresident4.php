<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../config/contacts.php');
include_once('../model/president4.php');

$db = new db();
$connect = $db->connect();

$president4 = new President4($connect);
$read = $president4->read();

$num = $read->rowCount();

if ($num > 0) {
    $president4_array = [];
    $president4_array['data'] = [];

    while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $president4_item = array(
            'id' => $id,
            'name' => $name,
            'dongCo' => $dongCo,
            'image' => $image,
        );
        array_push($president4_array['data'], $president4_item);
    }
    echo json_encode(($president4_array));
}
