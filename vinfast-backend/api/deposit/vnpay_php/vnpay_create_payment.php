<?php
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
try {
    //code...

    error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
    date_default_timezone_set('Asia/Ho_Chi_Minh');

    /**
     * Description of vnpay_ajax
     *
     * @author xonv
     */
    require_once("./config.php");

    $vnp_TxnRef = $_POST['order_id']; //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này sang VNPAY
    $vnp_OrderInfo = $_POST['order_desc'];
    $vnp_Amount = $_POST['amount'];
    $vnp_Locale = $_POST['language'];
    $vnp_Name = $_POST['name'];
    $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];

    $inputData = array(
        "vnp_Version" => "2.1.0",
        "vnp_TmnCode" => $vnp_TmnCode,
        "vnp_Amount" => $vnp_Amount,
        // "vnp_Name" => $vnp_Name,
        "vnp_OrderType" => "other",
        "vnp_Command" => "pay",
        "vnp_CreateDate" => date('YmdHis'),
        "vnp_CurrCode" => "VND",
        "vnp_IpAddr" => $vnp_IpAddr,
        "vnp_Locale" => $vnp_Locale,
        "vnp_OrderInfo" => $vnp_Name . "-" . $vnp_OrderInfo,
        "vnp_ReturnUrl" => $vnp_Returnurl,
        "vnp_TxnRef" => $vnp_TxnRef
    );

    if (isset($_POST['bank_code']) && $_POST['bank_code'] != "") {
        $inputData['vnp_BankCode'] = $_POST['bank_code'];
    }
    // if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
    //     $inputData['vnp_Bill_State'] = $vnp_Bill_State;
    // }

    //var_dump($inputData);
    ksort($inputData);
    $query = "";
    $i = 0;
    $hashdata = "";
    foreach ($inputData as $key => $value) {
        if ($i == 1) {
            $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
        } else {
            $hashdata .= urlencode($key) . "=" . urlencode($value);
            $i = 1;
        }
        $query .= urlencode($key) . "=" . urlencode($value) . '&';
    }

    $vnp_Url = $vnp_Url . "?" . $query;
    $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret);

    $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
    $returnData = array(
        'message' => 'success', 'data' => $vnp_Url
    );
    // if (isset($_POST['redirect'])) {
    //     header('Location: ' . $vnp_Url);
    //     die();
    // } else {
    echo json_encode($returnData);
    // }
} catch (\Throwable $th) {
    echo json_encode("https://sandbox.vnpayment.vn/paymentv2/Payment/Error.html?code=99");
}
