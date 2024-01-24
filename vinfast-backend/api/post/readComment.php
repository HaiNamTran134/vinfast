<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../../config/contacts.php');
include_once('../../model/comment/comment.php');

$db = new db();
$connect = $db->connect();

$comment = new Comment($connect);

$comment->post_id = isset($_GET['post_id']) ? $_GET['post_id'] : die();

$read = $comment->readComments();

$num = $read->rowCount();

if ($num > 0) {
    $list_comment_array = [];
    $list_comment_array['data'] = [];

    while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $list_comment_item = array(
            'comment_id' => $comment_id,
            'post_id' => $post_id,
            'user_id' => $user_id,
            'content' => $content,
            'avatar' => $avatar,
            'name' => $name,
        );
        array_push($list_comment_array['data'], $list_comment_item);
    }
    echo json_encode(($list_comment_array));
}