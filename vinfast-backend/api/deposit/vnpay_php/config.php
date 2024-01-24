<?php
date_default_timezone_set('Asia/Ho_Chi_Minh');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$vnp_TmnCode = "MHWHAIJZ"; //Website ID in VNPAY System
$vnp_HashSecret = "FUZQLFFCSNOUGOINIXHERKPEDJIJXWRA"; //Secret key
$vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
$vnp_Returnurl = "http://localhost:3000/dat-coc";
$vnp_apiUrl = "http://localhost:8080/vinfast/vinfast-backend/api/deposit/vnpay_php/vnpay_return.php";
//Config input format
//Expire
$startTime = date("YmdHis");
$expire = date('YmdHis', strtotime('+15 minutes', strtotime($startTime)));

// https://sandbox.vnpayment.vn/merchantv2/