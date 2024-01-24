<?php
class Deposit
{
    private $conn;

    // thông tin block1
    public $id;
    public $name_car_car;
    public $image;
    public $image1;
    public $image2;
    public $image3;
    public $image4;
    public $image5;
    public $image6;
    public $image7;
    public $image8;
    public $image9;
    public $image10;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;
    // public $image1;

    //connect db
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //read data LUX-SA2.0
    public function read360LuxSa()
    {
        $query = "SELECT * FROM views_car_360 where name_car = 'LUX SA2.0'";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    //read data LUX-A2.0
    public function read360LuxA()
    {
        $query = "SELECT * FROM views_car_360 where name_car = 'LUX A2.0'";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    //read data FADIL
    public function read360FADIL()
    {
        $query = "SELECT * FROM views_car_360 where name_car = 'FADIL'";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    //read data PRESIDENT
    public function read360PRESIDENT()
    {
        $query = "SELECT * FROM views_car_360 where name_car = 'PRESIDENT'";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    //read data VFE-34
    public function read360VFE34()
    {
        $query = "SELECT * FROM views_car_360 where name_car = 'VF e34'";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }
}
