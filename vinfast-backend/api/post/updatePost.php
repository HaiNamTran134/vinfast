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

if (isset($_POST['title'])) {
    $id = mysqli_real_escape_string($connect, $_POST['id']);
    $files = $_FILES['picture'];
    $title = mysqli_real_escape_string($connect, $_POST['title']);
    $content = htmlspecialchars(mysqli_real_escape_string($connect, $_POST['content']));
    $user_id = mysqli_real_escape_string($connect, $_POST['user_id']);
    $username = mysqli_real_escape_string($connect, $_POST['username']);

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
            $file_destination = '../../../vinfast-frontend/public/images/posts/' . $new_file_name;
            if (move_uploaded_file($templocation, $file_destination)) {
                $connection = "UPDATE list_post SET id= '$id', title= '$title', picture= 'http://localhost:3000/images/posts/$new_file_name', content= '$content', user_id= '$user_id', username= '$username' WHERE id = '$id'";
                if (mysqli_query($connect, $connection)) {
                    echo 'success';
                } else {
                    echo 'could not update data into the database';
                }
            }
        } else {
            echo 'there was an error in upload';
        }
    } else {
        echo 'file with this extension is not allowed';
    }
}
