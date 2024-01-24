<?php
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
require_once("./config.php");
// if ($secureHash == $vnp_SecureHash) {
if ($_GET['vnp_ResponseCode'] == '00') {
    $order_id = $_GET['vnp_TxnRef'];
    $money = $_GET['vnp_Amount'] / 100;
    $note = $_GET['vnp_OrderInfo'];
    $vnp_response_code = $_GET['vnp_ResponseCode'];
    $code_vnpay = $_GET['vnp_TransactionNo'];
    $code_bank = $_GET['vnp_BankCode'];
    $time = $_GET['vnp_PayDate'];
    $date_time = substr($time, 0, 4) . '-' . substr($time, 4, 2) . '-' . substr($time, 6, 2) . ' ' . substr($time, 8, 2) . ' ' . substr($time, 10, 2) . ' ' . substr($time, 12, 2);
    // include("../code/modules/kndatabase.php");
    $conn = mysqli_connect('localhost', 'root', '', 'vinfast_db');

    $sql = "SELECT * FROM payments WHERE order_id = '$order_id'";
    $query = mysqli_query($conn, $sql);
    $row = mysqli_num_rows($query);
    list($noteReal, $name) = explode('-', $note);
    if ($row > 0) {
        $sql = "UPDATE payments SET order_id = '$order_id', money = '$money', note = '$noteReal', vnp_response_code = '$vnp_response_code', code_vnpay = '$code_vnpay', code_bank = '$code_bank' WHERE order_id = '$order_id'";

        mysqli_query($conn, $sql);
    } else {
        $sql = "INSERT INTO payments(order_id, name_customer, money, note, vnp_response_code, code_vnpay, code_bank, time) VALUES ('$order_id', '$name', '$money', '$noteReal', '$vnp_response_code', '$code_vnpay', '$code_bank','$date_time')";
        mysqli_query($conn, $sql);
    }

    echo "GD Thanh cong";
    // echo json_encode($vnp_Returnurl);
} else {
    echo "GD Khong thanh cong";
    // echo json_encode($vnp_Returnurl_Fail);
}
// } else {
//     echo "Chu ky khong hop le";
// }