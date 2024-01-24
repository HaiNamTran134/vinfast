<?php
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

$connect = mysqli_connect('localhost', 'root', '', 'vinfast_db');

if (isset($_POST['id_xe'])) {
    $files = $_FILES['image'];
    $id_xe = mysqli_real_escape_string($connect, $_POST['id_xe']);
    $name =  mysqli_real_escape_string($connect, $_POST['name']);
    $slogan = mysqli_real_escape_string($connect, $_POST['slogan']);
    $description1 = mysqli_real_escape_string($connect, $_POST['description1']);
    $description2 = mysqli_real_escape_string($connect, $_POST['description2']);
    $description3 = mysqli_real_escape_string($connect, $_POST['description3']);
    $description4 = mysqli_real_escape_string($connect, $_POST['description4']);

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
            $file_destination = '../../../vinfast-frontend/public/images/admin/car/' . $new_file_name;
            if (move_uploaded_file($templocation, $file_destination)) {
                $connection = "INSERT INTO list_bike (id_xe, image, name, slogan, description1, description2, description3, description4) VALUES ('$id_xe', 'http://localhost:3000/images/admin/car/$new_file_name', '$name', '$slogan', '$description1', '$description2', '$description3', '$description4')";
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
