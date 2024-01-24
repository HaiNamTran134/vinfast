<?php
class Banner
{
    private $conn;

    // thông tin block1
    public $id;
    public $placement;
    public $banner;

    //connect db
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //read data
    public function read()
    {
        $query = "SELECT * FROM banner";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }
    //show data
    public function show()
    {
        $query = "SELECT * FROM banner where id=:id limit 1";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->id = $row['id'];
        $this->placement = $row['placement'];
        $this->banner = $row['banner'];
    }
    //create data
    public function create()
    {
        $query = "INSERT INTO banner SET id=:id, placement=:placement, banner=:banner";
        $stmt = $this->conn->prepare($query);
        //clean data
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->placement = htmlspecialchars(strip_tags($this->placement));
        $this->banner = htmlspecialchars(strip_tags($this->banner));
        //bind data
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':placement', $this->placement);
        $stmt->bindParam(':banner', $this->banner);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error %s, \n" . $stmt->error);
        return false;
    }
    //update data
    public function update()
    {
        $query = "UPDATE banner SET id=:id, placement=:placement, banner=:banner WHERE id =:id";

        $stmt = $this->conn->prepare($query);
        //clean data
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->placement = htmlspecialchars(strip_tags($this->placement));
        $this->banner = htmlspecialchars(strip_tags($this->banner));
        //bind data
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':placement', $this->placement);
        $stmt->bindParam(':banner', $this->banner);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error %s, \n" . $stmt->error);
        return false;
    }
    //delete data 
    public function delete()
    {
        $query = "DELETE FROM banner WHERE id =:id";

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
