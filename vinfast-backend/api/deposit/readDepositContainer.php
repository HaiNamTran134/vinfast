<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../../config/contacts.php');
include_once('../../model/deposit/depositContainer.php');

$db = new db();
$connect = $db->connect();

$depositContainer = new DepositContainer($connect);
$readDepositContainer = $depositContainer->readDepositContainer();

$num = $readDepositContainer->rowCount();

if ($num > 0) {
    $depositContainer_array = [];
    $depositContainer_array['data'] = [];

    while ($row = $readDepositContainer->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $depositContainer_item = array(
            'id' => $id,
            'container' => $container,
            'containerActive' => $containerActive,
        );
        array_push($depositContainer_array['data'], $depositContainer_item);
    }
    echo json_encode(($depositContainer_array));
}
