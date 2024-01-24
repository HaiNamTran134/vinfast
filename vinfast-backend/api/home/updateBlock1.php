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

if (isset($_POST['id'])) {
    $files = $_FILES['image'];
    $id = mysqli_real_escape_string($connect, $_POST['id']);
    $title = mysqli_real_escape_string($connect, $_POST['title']);
    $description = mysqli_real_escape_string($connect, $_POST['description']);


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
                $connection = "UPDATE block1 SET id= '$id', title = '$title', description = '$description', image= 'http://localhost:3000/images/admin/car/$new_file_name' WHERE id = '$id'";
                if (mysqli_query($connect, $connection)) {
                    echo 'success';
                } else {
                    echo 'could not update data into the database';
                    echo $id;
                }
            }
        } else {
            echo 'there was an error in upload';
        }
    } else {
        $connection = "UPDATE block1 SET id= '$id', title = '$title', description = '$description' WHERE id = '$id'";
        if (mysqli_query($connect, $connection)) {
            echo 'success';
        } else {
            echo 'could not update data into the database';
            echo $id;
        }
    }
}
