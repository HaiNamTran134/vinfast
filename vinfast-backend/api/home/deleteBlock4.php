<?php
    header("Access-Control-Allow-Origin:*");
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: DELETE');
    header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Request-With");
    
    include_once('../../config/contacts.php');
    include_once('../../model/home/block4.php'); 
    
    $db = new db();
    $connect = $db->connect();
    
    $block4 = new Block4($connect);
    
    $block4->id_xe = isset($_GET['id_xe']) ? $_GET['id_xe'] : die();  
     
    $block4->delete();
    
    if ($block4->delete()) {
        echo json_encode(array('message', 'User Deleted'));
    } else { 
        echo json_encode(array('message', 'User Not Deleted'));
    }
    
?>