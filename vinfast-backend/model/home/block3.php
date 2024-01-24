<?php
class Block3
{
    private $conn;

    // thông tin block1
    public $id_xe;
    public $slug;
    public $dongxe;
    public $slogan;
    public $name;
    public $description1;
    public $description2;
    public $description3;
    public $description4;
    public $image;

    //connect db
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //read data
    public function read()
    {
        $query = "SELECT * FROM list_car";

        $stmt = $this->conn->prepare($query); 

        $stmt->execute();
        return $stmt;
    }
    //show data
    public function show()
    {
        $query = "SELECT * FROM list_car WHERE id_xe=? LIMIT 1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->id_xe);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id_xe = $row['id_xe'];
        $this->slug = $row['slug']; 
        $this->dongxe = $row['dongxe'];
        $this->slogan = $row['slogan'];
        $this->name = $row['name'];
        $this->description1 = $row['description1'];
        $this->description2 = $row['description2'];
        $this->description3 = $row['description3'];
        $this->description4 = $row['description4'];
        $this->image = $row['image'];
    }
    //create data
    public function create()
    {
        $query = "INSERT INTO list_car SET id_xe=:id_xe, slug=:slug, dongxe=:dongxe, slogan=:slogan, name=:name, description1=:description1, description2=:description2, description3=:description3, description4=:description4, image=:image";

        $stmt = $this->conn->prepare($query);

        //clean data
        $this->id_xe = htmlspecialchars(strip_tags($this->id_xe));
        $this->slug = htmlspecialchars(strip_tags($this->slug));
        $this->dongxe = htmlspecialchars(strip_tags($this->dongxe));
        $this->slogan = htmlspecialchars(strip_tags($this->slogan));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->description1 = htmlspecialchars(strip_tags($this->description1));
        $this->description2 = htmlspecialchars(strip_tags($this->description2));
        $this->description3 = htmlspecialchars(strip_tags($this->description3));
        $this->description4 = htmlspecialchars(strip_tags($this->description4));
        $this->image = htmlspecialchars(strip_tags($this->image));

        //bind data
        $stmt->bindParam(':id_xe', $this->id_xe);
        $stmt->bindParam(':slug', $this->slug);
        $stmt->bindParam(':dongxe', $this->dongxe);
        $stmt->bindParam(':slogan', $this->slogan);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':description1', $this->description1);
        $stmt->bindParam(':description2', $this->description2);
        $stmt->bindParam(':description3', $this->description3);
        $stmt->bindParam(':description4', $this->description4);
        $stmt->bindParam(':image', $this->image);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error %s, \n" . $stmt->error);
        return false;
    }
    //update data
    public function update()
    {
        $query = "UPDATE list_car SET id_xe=:id_xe, slug=:slug, dongxe=:dongxe, slogan=:slogan, name=:name, description1=: description1, description2=:description2, description3=:description3, description4=:description4, image=:image WHERE id_xe =:id_xe";

        $stmt = $this->conn->prepare($query);

        //clean data
        $this->id_xe = htmlspecialchars(strip_tags($this->id_xe));
        $this->slug = htmlspecialchars(strip_tags($this->slug));
        $this->dongxe = htmlspecialchars(strip_tags($this->dongxe));
        $this->slogan = htmlspecialchars(strip_tags($this->slogan));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->description1 = htmlspecialchars(strip_tags($this->description1));
        $this->description2 = htmlspecialchars(strip_tags($this->description2));
        $this->description3 = htmlspecialchars(strip_tags($this->description3));
        $this->description4 = htmlspecialchars(strip_tags($this->description4));
        $this->image = htmlspecialchars(strip_tags($this->image));
       

        //bind data
        $stmt->bindParam(':id_xe', $this->id_xe);
        $stmt->bindParam(':slug', $this->slug);
        $stmt->bindParam(':dongxe', $this->dongxe);
        $stmt->bindParam(':slogan', $this->slogan);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':description1', $this->description1);
        $stmt->bindParam(':description2', $this->description2);
        $stmt->bindParam(':description3', $this->description3);
        $stmt->bindParam(':description4', $this->description4);
        $stmt->bindParam(':image', $this->image);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error %s, \n" . $stmt->error);
        return false;
    }
     //delete data
     public function delete()
     {
         $query = "DELETE FROM list_car WHERE id_xe =:id_xe";
 
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
