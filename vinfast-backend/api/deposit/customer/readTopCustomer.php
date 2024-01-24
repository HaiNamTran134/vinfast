<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../../../config/contacts.php');
include_once('../../../model/deposit/customer/customer.php');

$db = new db();
$connect = $db->connect();

$customer = new Customer($connect);
$read = $customer->readTopCustomer();

$num = $read->rowCount();

if ($num > 0) {
    $list_customer_array = [];
    $list_customer_array['data'] = [];

    while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $list_customer_item = array(
            'order_id' => $order_id,
            'name' => $name,
            'price' => $price,
            'published_at' => $published_at,
            'status' => $status,
        );
        array_push($list_customer_array['data'], $list_customer_item);
    }
    echo json_encode(($list_customer_array));
}
