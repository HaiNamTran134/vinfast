<?php
class db
{
    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $database = "vinfast_db";
    private $conn;
    public function connect()
    {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->servername . ";dbname=" . $this->database . "", $this->username, $this->password);
            //set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "Successful";
        } catch (PDOException $e) {
            echo "Failed" . $e->getMessage();
        }
        return $this->conn;
    }
}
