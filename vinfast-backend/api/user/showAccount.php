<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');

include_once('../../config/contacts.php');
include_once('../../model/user/Account.php');

$db = new db();
$connect = $db->connect();

$account = new Account($connect);

$account->id = isset($_GET['id']) ? $_GET['id'] : die();

$account->show();

$account_item = array(
    'id' => $account->id,
    'avatar' => $account->avatar,
    'name' => $account->name,
    'email' => $account->email,
    'password' => $account->password,
    'role' => $account->role,
);

print_r(json_encode($account_item));
