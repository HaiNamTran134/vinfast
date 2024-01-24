<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../../config/contacts.php');
include_once('../../model/user/Account.php');

$db = new db();
$connect = $db->connect();

$account = new Account($connect);

$account->from = isset($_GET['from']) ? $_GET['from'] : die();
$account->to = isset($_GET['to']) ? $_GET['to'] : die();

$read = $account->FromDayToDay();

$num = $read->rowCount();

if ($num > 0) {
    $list_account_array = [];
    $list_account_array['data'] = [];

    while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $list_account_item = array(
            'email' => $email,
            'name' => $name,
        );
        array_push($list_account_array['data'], $list_account_item);
    }
    echo json_encode(($list_account_array));
}
