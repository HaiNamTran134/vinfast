<?php
require('../../model/carbon/autoload.php');

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

if (isset($_POST['id'])) {
    $files = $_FILES['avatar'];
    $id = mysqli_real_escape_string($connect, $_POST['id']);
    $name = mysqli_real_escape_string($connect, $_POST['name']);
    $email = mysqli_real_escape_string($connect, $_POST['email']);
    $password = mysqli_real_escape_string($connect, $_POST['password']);
    $role = mysqli_real_escape_string($connect, $_POST['role']);
    $date_create = carbon::now('Asia/Ho_Chi_Minh');

    //file properties
    $filename = $files['name'];
    $templocation = $files['tmp_name'];
    $uploaderrors = $files['error'];

    $splitedname = explode('.', $filename);
    $fileextension = strtolower(end($splitedname));

    $allowed_extentions = ['png', 'jpg', 'jpeg'];

    if (in_array($fileextension, $allowed_extentions)) {
        if ($uploaderrors === 0) {
            $new_file_name = uniqid() . '.' . $fileextension;
            $file_destination = '../../../vinfast-frontend/public/images/avatar/' . $new_file_name;
            if (move_uploaded_file($templocation, $file_destination)) {
                $connection = "INSERT INTO vinfast_account (id, avatar, name, email, password, role, date_create) VALUES ('$id', 'http://localhost:3000/images/avatar/$new_file_name', '$name', '$email', '$password', '$role', '$date_create')";
                if (mysqli_query($connect, $connection)) {
                    echo 'success';
                } else {
                    echo 'could not insert data into the database';
                }
            }
        } else {
            echo 'there was an error in upload';
        }
    } else {
        echo 'file with this extension is not allowed';
    }
}
