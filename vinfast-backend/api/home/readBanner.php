<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../../config/contacts.php');
include_once('../../model/home/banner.php');

$db = new db();
$connect = $db->connect();

$banner = new Banner($connect);
$read = $banner->read();

$num = $read->rowCount();

if ($num > 0) {
    $banner_array = [];
    $banner_array['data'] = [];

    while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
        extract($row); 

        $banner_item = array(
            'id' => $id,
            'placement' => $placement,
            'banner' => $banner,
        );
        array_push($banner_array['data'], $banner_item);
    }
    echo json_encode(($banner_array));
}
