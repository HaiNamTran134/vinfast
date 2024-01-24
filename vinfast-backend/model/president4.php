<?php
class President4
{
    private $conn;

    // thông tin block1
    public $id;
    public $name;
    public $dongCo;
    public $image;

    //connect db
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //read data
    public function read()
    {
        $query = "SELECT * FROM president4";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }
}
