<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../../config/contacts.php');
include_once('../../model/post/post.php');

$db = new db();
$connect = $db->connect();

$post = new Post($connect);
$read = $post->readTopPost();

$num = $read->rowCount();

if ($num > 0) {
    $list_post_array = [];
    $list_post_array['data'] = [];

    while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $list_post_item = array(
            'id' => $id,
            'picture' => $picture,
            'title' => $title,
            'content' => html_entity_decode($content),
            'views_count' => $views_count,
            'views_heart' => $views_heart,
            'views_comment' => $views_comment,
            'user_id' => $user_id,
            'username' => $username,
            'published_at' => $published_at,
        );
        array_push($list_post_array['data'], $list_post_item);
    }
    echo json_encode(($list_post_array));
}
