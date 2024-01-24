<?php
class Block2
{
    private $conn;

    // thông tin block1
    public $id;
    public $quote;
    public $author;

    //connect db
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //read data
    public function read()
    {
        $query = "SELECT * FROM block2";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }
    //show data
    public function show()
    {
        $query = "SELECT * FROM block2 WHERE id=? LIMIT 1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id = $row['id'];
        $this->quote = $row['quote'];
        $this->author = $row['author'];
    }
    //create data
    public function create()
    {
        $query = "INSERT INTO block2 SET quote=:quote, author=:author";

        $stmt = $this->conn->prepare($query);

        //clean data
        $this->quote = htmlspecialchars(strip_tags($this->quote));
        $this->author = htmlspecialchars(strip_tags($this->author));

        //bind data
        $stmt->bindParam(':quote', $this->quote);
        $stmt->bindParam(':author', $this->author);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error %s, \n" . $stmt->error);
        return false;
    }
    //update data 
    public function update()
    {
        $query = "UPDATE block2 SET quote=:quote, author=:author WHERE id =:id";

        $stmt = $this->conn->prepare($query);

        //clean data
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->quote = htmlspecialchars(strip_tags($this->quote));
        $this->author = htmlspecialchars(strip_tags($this->author));


        //bind data
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':quote', $this->quote);
        $stmt->bindParam(':author', $this->author);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error %s, \n" . $stmt->error);
        return false;
    }
    //delete data
    public function delete()
    {
        $query = "DELETE FROM block2 WHERE id =:id";

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
}
