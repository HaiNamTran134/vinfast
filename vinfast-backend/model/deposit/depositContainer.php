<?php
class DepositContainer
{
    private $conn;

    // thông tin block1
    public $id;
    public $container;
    public $containerActive;

    //connect db
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //read data LUX-SA2.0
    public function readDepositContainer()
    {
        $query = "SELECT * FROM deposit_container";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }
}
