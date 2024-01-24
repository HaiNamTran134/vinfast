<?php
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

include_once('../../config/contacts.php');
include_once('../../model/comment/comment.php');

$db = new db();
$conn = $db->connect();
// $conn = mysqli_connect('localhost', 'root', '', 'vinfast_db');



// $data = json_decode(file_get_contents("php://input"));

// $content = mysqli_real_escape_string($conn, $_POST['content']);
// $user_id = mysqli_real_escape_string($conn, $_POST['user_id']);
// $post_id = mysqli_real_escape_string($conn, $_POST['post_id']);
// $published_at = mysqli_real_escape_string($conn, $_POST['published_at']);

$data = new Comment($conn);
$data->content = $_POST['content'];
$data->user_id = $_POST['user_id'];
$data->post_id = $_POST['post_id'];
$data->published_at = $_POST['published_at'];

if ($data->createComment()) {
    echo json_encode(array('message', 'Question Created'));
} else
    echo json_encode(array('message', 'Question Not Created'));
try {
    require __DIR__ . '../../../vendor/autoload.php';
    $options = array(
        'cluster' => 'ap1',
        'useTLS' => true
    );
    $pusher = new Pusher\Pusher(
        'c9858b741ded216e8ece',
        '6d4b273d997644dee7a2',
        '1349031',
        $options
    );
    $response = $pusher->trigger('my-channel', 'create-comment', $data);
} catch (\Throwable $th) {
    echo $th;
}

// $query = "INSERT INTO list_comment SET content=:content, user_id=:user_id, post_id=:post_id, published_at=:published_at";

// $stmt = $conn->prepare($query);

// //clean data
// // $comment_id = htmlspecialchars(($comment_id));
// $content = htmlspecialchars($content);
// $user_id = htmlspecialchars(strip_tags($user_id));
// $post_id = htmlspecialchars(strip_tags($post_id));
// $published_at = htmlspecialchars(strip_tags($published_at));

// //bind data
// // $stmt->bindParam(':comment_id', $comment_id);
// $stmt->bind_param(':content', $content);
// $stmt->bind_param(':user_id', ($user_id));
// $stmt->bind_param(':post_id', $post_id);
// $stmt->bind_param(':published_at', $published_at);

// if ($stmt->execute()) {
//     echo json_encode(array('message', 'Question Created'));
// }
// printf("Error %s, \n" . $stmt->error);
// echo json_encode(array('message', 'Question Not Created'));