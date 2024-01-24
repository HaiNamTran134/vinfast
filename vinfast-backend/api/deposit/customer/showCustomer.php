<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../../../config/contacts.php');
include_once('../../../model/deposit/customer/customer.php');

$db = new db();
$connect = $db->connect();

$customer = new customer($connect);

$customer->id = isset($_GET['id']) ? $_GET['id'] : die();

$customer->show();

$customer_item = array(
    'id' => $customer->id,
    'order_id' => $customer->order_id,
    'name_car' => $customer->name_car,
    'color_car' => $customer->color_car,
    'name' => $customer->name,
    'phone' => $customer->phone,
    'cccd' => $customer->cccd,
    'email' => $customer->email,
    'province' => $customer->province,
    'money_deposit' => $customer->money_deposit,
    'price' => $customer->price,
    'note' => $customer->note,
    'file' => $customer->file,
    'published_at' => $customer->published_at,
    'status' => $customer->status,
);

print_r(json_encode($customer_item));
