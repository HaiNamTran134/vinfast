<?php
    header("Access-Control-Allow-Origin:*");
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: DELETE');
    header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Request-With");
    
    include_once('../../config/contacts.php');
    include_once('../../model/home/block1.php'); 
    
    $db = new db();
    $connect = $db->connect();
    
    $block1 = new Block1($connect);
    
    $block1->id = isset($_GET['id']) ? $_GET['id'] : die();  
    
    $block1->delete();
    
    // $data = json_decode(file_get_contents("php://input"));
    
    // $product->id = $data->id;
    
    if ($block1->delete()) {
        echo json_encode(array('message', 'User Deleted'));
    } else {
        echo json_encode(array('message', 'User Not Deleted'));
    }
    
?>