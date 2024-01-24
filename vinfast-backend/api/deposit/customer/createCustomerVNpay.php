<?php
require('../../../model/carbon/autoload.php');

use Carbon\Carbon;
use Carbon\CarbonInterval;

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

$connect = mysqli_connect('localhost', 'root', '', 'vinfast_db');

if (isset($_POST['name'])) {
    $name = mysqli_real_escape_string($connect, $_POST['name']);
    $name_car = mysqli_real_escape_string($connect, $_POST['name_car']);
    $color_car = mysqli_real_escape_string($connect, $_POST['color_car']);
    $phone = mysqli_real_escape_string($connect, $_POST['phone']);
    $cccd = mysqli_real_escape_string($connect, $_POST['cccd']);
    $email = mysqli_real_escape_string($connect, $_POST['email']);
    $province = mysqli_real_escape_string($connect, $_POST['province']);
    $image_car = mysqli_real_escape_string($connect, $_POST['image_car']);
    $price = mysqli_real_escape_string($connect, $_POST['price']);
    $money_deposit = mysqli_real_escape_string($connect, $_POST['money_deposit']);
    $published_at = carbon::now('Asia/Ho_Chi_Minh');
    $status = mysqli_real_escape_string($connect, $_POST['status']);
    $order_id = mysqli_real_escape_string($connect, $_POST['order_id']);
    $order_desc = mysqli_real_escape_string($connect, $_POST['order_desc']);
    $connection = "INSERT INTO vinfast_customer (order_id, name_car, color_car, name, phone, cccd, email, province, image_car, money_deposit, price, note,  published_at, status) VALUES ('$order_id', '$name_car' , '$color_car', '$name', '$phone' ,'$cccd', '$email', '$province', '$image_car', '$money_deposit', '$price', '$order_desc', '$published_at', '$status')";
    if (mysqli_query($connect, $connection)) {
        echo 'success';
    } else {
        echo 'could not insert data into the database';
    }
}