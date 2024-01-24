<?php
class Post
{
    private $conn;

    // thông tin user
    public $id;
    public $picture;
    public $title;
    public $content;
    public $views_count;
    public $views_heart;
    public $views_comment;
    public $username;
    public $published_at;
    public $user_id;
    public $post_id;
    //connect db
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //read data
    public function read()
    {
        $query = "SELECT * FROM list_post ORDER BY list_post.id DESC";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    //read top 5 data
    public function readTopPost()
    {
        $query = "SELECT * FROM list_post ORDER BY list_post.id DESC LIMIT 6;";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    //show data by user
    public function showByUser()
    {
        $query = "SELECT * FROM list_post WHERE user_id = ?";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->user_id);
        $stmt->execute();

        return $stmt;
    }

    //show data by id
    public function show()
    {
        $query = "SELECT * FROM list_post WHERE id = ? LIMIT 1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->id = $row['id'];
        $this->picture = $row['picture'];
        $this->title = $row['title'];
        $this->content = $row['content'];
        $this->username = $row['username'];
        $this->user_id = $row['user_id'];
        $this->published_at = $row['published_at'];
    }

    //create data
    public function create()
    {
        $query = "INSERT INTO list_post SET picture=:picture, title=:title, content=:content, username=:username, published_at=:published_at";

        $stmt = $this->conn->prepare($query);

        //clean data
        $this->picture = htmlspecialchars(($this->picture));
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->content = htmlspecialchars(($this->content));
        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->published_at = htmlspecialchars(strip_tags($this->published_at));

        //bind data
        $stmt->bindParam(':picture', $this->picture);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':content', ($this->content));
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':published_at', $this->published_at);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error %s, \n" . $stmt->error);
        return false;
    }

    //delete data
    public function delete()
    {
        $query = "DELETE FROM list_post WHERE id =:id";

        $stmt = $this->conn->prepare($query);

        //clean data
        $this->id = htmlspecialchars(strip_tags($this->id));

        //bind data
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error %s, \n" . $stmt->error);
        return false;
    }

    //read comments
    public function readComments()
    {
        $query = "SELECT comment_id, content, user_id, post_id, vinfast_account.avatar, vinfast_account.name
        FROM list_comment INNER JOIN vinfast_account ON list_comment.user_id = vinfast_account.id WHERE post_id = ?";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->post_id);
        $stmt->execute();

        return $stmt;
    }

    //create comment
    public function createComment()
    {
        $query = "INSERT INTO list_comment SET content=:content, user_id=:user_id, post_id=:post_id, published_at=:published_at";

        $stmt = $this->conn->prepare($query);

        //clean data
        // $this->comment_id = htmlspecialchars(($this->comment_id));
        $this->content = htmlspecialchars(($this->content));
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->post_id = htmlspecialchars(strip_tags($this->post_id));
        $this->published_at = htmlspecialchars(strip_tags($this->published_at));

        //bind data
        // $stmt->bindParam(':comment_id', $this->comment_id);
        $stmt->bindParam(':content', $this->content);
        $stmt->bindParam(':user_id', ($this->user_id));
        $stmt->bindParam(':post_id', $this->post_id);
        $stmt->bindParam(':published_at', $this->published_at);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error %s, \n" . $stmt->error);
        return false;
    }
}