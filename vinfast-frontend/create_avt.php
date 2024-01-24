<?php
header("Access-Control-Allow-Origin:*");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Request-With");

$connect = mysqli_connect('localhost', 'root', '123456', 'vinfast_db');

if (isset($_POST['dataAvt'])) {
    // Nhận dữ liệu canvas
    $avatar = $_POST['dataAvt'];
    $name = mysqli_real_escape_string($connect, $_POST['name']);
    $email = mysqli_real_escape_string($connect, $_POST['email']);
    $password = mysqli_real_escape_string($connect, $_POST['password']);
    $date_create = mysqli_real_escape_string($connect, $_POST['date_create']);

    // Tìm kiếm và thay thế đường dẫn ảnh
    $avatar = str_replace('data:image/png;base64,', '', $avatar);
    $avatar = str_replace(' ', '+', $avatar);

    $fileData = base64_decode($avatar); // Mã hoá file dạng Base64

    // Tạo tên ảnh ngẫu nhiên để không bị trùng lặp 
    $charName = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $randName = substr(str_shuffle($charName), 0, 15);

    // Đường dẫn thư mục ảnh
    $fileName = '../vinfast-frontend/public/images/avatar/' . $randName . '.png';

    // Đặt dữ liệu canvas vào file ảnh
    file_put_contents($fileName, $fileData);

    $connection = "INSERT INTO vinfast_account (avatar, name, email, password, date_create) VALUES ('http://localhost:3000/images/avatar/$randName.png', '$name' ,'$email', '$password', '$date_create')";
    if (mysqli_query($connect, $connection)) {
        echo 'success';
    } else {
        echo 'could not insert data into the database';
    }
}
