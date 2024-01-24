<?php
    header("Access-Control-Allow-Origin:*");
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: DELETE');
    header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Request-With");
    
    include_once('../../config/contacts.php');
    include_once('../../model/home/block3.php'); 
     
    $db = new db();
    $connect = $db->connect();
    
    $block3 = new Block3($connect);
    
    $block3->id_xe = isset($_GET['id_xe']) ? $_GET['id_xe'] : die();  
    
    $block3->delete();
    
    if ($block3->delete()) {
        echo json_encode(array('message', 'User Deleted'));
    } else { 
        echo json_encode(array('message', 'User Not Deleted'));
    }
    
?>