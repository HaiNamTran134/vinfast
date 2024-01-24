<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');

include_once('../../config/contacts.php');
include_once('../../model/post/post.php');

$db = new db();
$connect = $db->connect();

$post = new post($connect);

$post->id = isset($_GET['id']) ? $_GET['id'] : die();

$post->show();

$post_item = array(
    'id' => $post->id,
    'picture' => $post->picture,
    'title' => $post->title,
    'content' => $post->content,
    'username' => $post->username,
    'user_id' => $post->user_id,
    'published_at' => $post->published_at,
);

print_r(json_encode($post_item));
