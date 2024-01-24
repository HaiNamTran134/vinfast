<?php
    header("Access-Control-Allow-Origin:*");
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: DELETE');
    header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Request-With");
    
    include_once('../../config/contacts.php');
    include_once('../../model/home/banner.php'); 
    
    $db = new db();
    $connect = $db->connect();
    
    $banner = new Banner($connect);
    
    $banner->id = isset($_GET['id']) ? $_GET['id'] : die();  
    
    $banner->delete();
    
    // $data = json_decode(file_get_contents("php://input"));
    
    // $product->id = $data->id;
    
    if ($banner->delete()) {
        echo json_encode(array('message', 'User Deleted'));
    } else {
        echo json_encode(array('message', 'User Not Deleted'));
    }
    
?>