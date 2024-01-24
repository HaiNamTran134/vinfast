<?php
class Comment
{
    private $conn;

    // thông tin user
    public $comment_id;
    public $post_id;
    public $user_id;
    public $content;
    public $published_at;

    //connect db
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //read data
    public function read()
    {
        $query = "SELECT * FROM list_comment ORDER BY list_comment.id DESC";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    //read top 15 data
    public function readTopComment()
    {
        $query = "SELECT * FROM list_comment ORDER BY list_comment.id DESC LIMIT 15;";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    //show data by user
    public function showByPost()
    {
        $query = "SELECT * FROM list_comment WHERE post_id = ? ORDER BY list_comment.id DESC";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->post_id);
        $stmt->execute();

        return $stmt;
    }

    //create data
    public function create()
    {
        $query = "INSERT INTO list_comment SET picture=:picture, title=:title, content=:content, username=:username, published_at=:published_at";

        $stmt = $this->conn->prepare($query);

        //clean data
        $this->comment_id = htmlspecialchars(($this->comment_id));
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->content = htmlspecialchars(($this->content));
        $this->post_id = htmlspecialchars(strip_tags($this->post_id));
        $this->published_at = htmlspecialchars(strip_tags($this->published_at));

        //bind data
        $stmt->bindParam(':comment_id', $this->comment_id);
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':content', ($this->content));
        $stmt->bindParam(':post_id', $this->post_id);
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
        $query = "DELETE FROM list_comment WHERE id =:id";

        $stmt = $this->conn->prepare($query);

        //clean data
        $this->comment_id = htmlspecialchars(strip_tags($this->comment_id));

        //bind data
        $stmt->bindParam(':id', $this->comment_id);

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
