<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "vinfast_db";
$id = '';

$con = mysqli_connect($host, $user, $password, $dbname);

if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Connected successfully";

$query = "INSERT INTO login1 (id, email, password) VALUES('1', '2', '3')";

if (mysqli_query($con, $query)) {
    echo "Data has been inserted successfully";
} else {
    echo "Error!";
}

// $method = $_SERVER['REQUEST_METHOD'];
// $request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
