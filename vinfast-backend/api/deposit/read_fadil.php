<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../../config/contacts.php');
include_once('../../model/deposit/deposit.php');

$db = new db();
$connect = $db->connect();

$deposit = new Deposit($connect);
$readFADIL = $deposit->readFADIL();

$num = $readFADIL->rowCount();

if ($num > 0) {
    $deposit_array = [];
    $deposit_array['data'] = [];

    while ($row = $readFADIL->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $deposit_item = array(
            'id' => $id,
            'name' => $name,
            'slug' => $slug,
            'count' => $count,
            'image' => $image,
            'color' => $color,
            'color2' => $color2,
            'colorCode' => $colorCode,
            'price' => $price,
            'deposits' => $deposits,
        );
        array_push($deposit_array['data'], $deposit_item);
    }
    echo json_encode(($deposit_array));
}
