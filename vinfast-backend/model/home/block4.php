<?php
class Block4
{
    private $conn;

    // thông tin block4 
    public $id_xe;
    public $image; 
    public $name; 
    public $slogan;
    public $description1; 
    public $description2;
    public $description3; 
    public $description4;

    //connect db
    public function __construct($db) 
    {
        $this->conn = $db;
    }

    //read data
    public function read()
    {
        $query = "SELECT * FROM list_bike";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }
    //show data
    public function show()
    {
        $query = "SELECT * FROM list_bike WHERE id_xe=? LIMIT 1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->id_xe);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
 
        $this->id_xe = $row['id_xe'];
        $this->image = $row['image'];
        $this->name = $row['name'];
        $this->slogan = $row['slogan'];
        $this->description1 = $row['description1'];
        $this->description2 = $row['description2'];
        $this->description3 = $row['description3'];
        $this->description4 = $row['description4'];
    }
    //create data
    public function create()
    {
        $query = "INSERT INTO list_bike SET id_xe=:id_xe, image=:image, name=:name, slogan=:slogan, description1=:description1, description2=:description2, description3=:description3, description4=:description4";

        $stmt = $this->conn->prepare($query);

        //clean data
        $this->id_xe = htmlspecialchars(strip_tags($this->id_xe));
        $this->image = htmlspecialchars(strip_tags($this->image));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->slogan = htmlspecialchars(strip_tags($this->slogan));
        $this->description1 = htmlspecialchars(strip_tags($this->description1));
        $this->description2 = htmlspecialchars(strip_tags($this->description2));
        $this->description3 = htmlspecialchars(strip_tags($this->description3));
        $this->description4 = htmlspecialchars(strip_tags($this->description4));

        //bind data
        $stmt->bindParam(':id_xe', $this->id_xe);
        $stmt->bindParam(':image', $this->image);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':slogan', $this->slogan);
        $stmt->bindParam(':description1', $this->description1);
        $stmt->bindParam(':description2', $this->description2);
        $stmt->bindParam(':description3', $this->description3);
        $stmt->bindParam(':description4', $this->description4);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error %s, \n" . $stmt->error);
        return false;
    }
    //update data
    public function update()
    {
        $query = "UPDATE list_bike SET id_xe=:id_xe, image=:image, name=:name, slogan=:slogan, description1=: description1, description2=:description2, description3=:description3, description4=:description4 WHERE id_xe =:id_xe";

        $stmt = $this->conn->prepare($query);

        //clean data
        $this->id_xe = htmlspecialchars(strip_tags($this->id_xe));
        $this->image = htmlspecialchars(strip_tags($this->image));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->slogan = htmlspecialchars(strip_tags($this->slogan));
        $this->description1 = htmlspecialchars(strip_tags($this->description1));
        $this->description2 = htmlspecialchars(strip_tags($this->description2));
        $this->description3 = htmlspecialchars(strip_tags($this->description3));
        $this->description4 = htmlspecialchars(strip_tags($this->description4));
       

        //bind data
        $stmt->bindParam(':id_xe', $this->id_xe);
        $stmt->bindParam(':image', $this->image);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':slogan', $this->slogan);
        $stmt->bindParam(':description1', $this->description1);
        $stmt->bindParam(':description2', $this->description2);
        $stmt->bindParam(':description3', $this->description3);
        $stmt->bindParam(':description4', $this->description4);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error %s, \n" . $stmt->error);
        return false;
    }
     //delete data
     public function delete()
     {
         $query = "DELETE FROM list_bike WHERE id_xe =:id_xe";
 
         $stmt = $this->conn->prepare($query);
 
         //clean data 
         $this->id_xe = htmlspecialchars(strip_tags($this->id_xe)); 
 
         //bind data
         $stmt->bindParam(':id_xe', $this->id_xe);
 
         if ($stmt->execute()) {
             return true;
         }
         printf("Error %s, \n" . $stmt->error);
         return false;
     }
}
