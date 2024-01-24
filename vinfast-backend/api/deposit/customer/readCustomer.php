<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../../../config/contacts.php');
include_once('../../../model/deposit/customer/customer.php');

// $data = array(
//     'name' => $name,
//     'email' => $email,
// );
//   $pusher->trigger('my-channel', 'my-event', $data);

$db = new db();
$connect = $db->connect();

$customer = new Customer($connect);
$read = $customer->read();

$num = $read->rowCount();

if ($num > 0) {
    $list_customer_array = [];
    $list_customer_array['data'] = [];
    while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $list_customer_item = array(
            'id' => $id,
            'order_id' => $order_id,
            'name_car' => $name_car,
            'color_car' => $color_car,
            'name' => $name,
            'phone' => $phone,
            'cccd' => $cccd,
            'email' => $email,
            'province' => $province,
            'money_deposit' => $money_deposit,
            'price' => $price,
            'note' => $note,
            'file' => $file,
            'published_at' => $published_at,
            'status' => $status,
        );
        array_push($list_customer_array['data'], $list_customer_item);
    }
    // require __DIR__ . '../../../../vendor/autoload.php';

    // $options = array(
    //     'cluster' => 'ap1',
    //     'useTLS' => true
    // );
    // $pusher = new Pusher\Pusher(
    //     'c9858b741ded216e8ece',
    //     '6d4b273d997644dee7a2',
    //     '1349031',
    //     $options
    // );
    // $response = $pusher->trigger('my-channel', 'my-event', $list_customer_array['data']);
    echo json_encode($list_customer_array);
}
