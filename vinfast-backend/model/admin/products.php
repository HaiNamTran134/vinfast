<?php
class Product
{
    private $conn;

    // thông tin FullCar
    public $id;
    public $slug;
    public $name;
    public $count;
    public $image;
    public $color;
    public $price;
    public $deposits;

    //connect db
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //read data
    public function read()
    {
        $query = "SELECT * FROM full_color_car";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    //show data
    public function show()
    {
        $query = "SELECT * FROM full_color_car WHERE id=? LIMIT 1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id = $row['id'];
        $this->name = $row['name'];
        $this->count = $row['count'];
        $this->image = $row['image'];
        $this->color = $row['color'];
        $this->price = $row['price'];
        $this->deposits = $row['deposits'];
    }

    //create data
    public function create()
    {
        $query = "INSERT INTO full_color_car SET id=:id, name=:name, count=:count, image=:image, color=:color, price=:price, deposits=:deposits";

        $stmt = $this->conn->prepare($query);

        //clean data
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->count = htmlspecialchars(strip_tags($this->count));
        $this->image = htmlspecialchars(strip_tags($this->image));
        $this->color = htmlspecialchars(strip_tags($this->color));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->deposits = htmlspecialchars(strip_tags($this->deposits));

        //bind data
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':count', $this->count);
        $stmt->bindParam(':image', $this->image);
        $stmt->bindParam(':color', $this->color);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':deposits', $this->deposits);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error %s, \n" . $stmt->error);
        return false;
    }

    //update data
    public function update()
    {
        $query = "UPDATE full_color_car SET id=:id, name=:name, count=:count, image=:image, color=:color, price=:price, deposits=:deposits WHERE id =:id";

        $stmt = $this->conn->prepare($query);

        //clean data
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->count = htmlspecialchars(strip_tags($this->count));
        $this->image = htmlspecialchars(strip_tags($this->image));
        $this->color = htmlspecialchars(strip_tags($this->color));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->deposits = htmlspecialchars(strip_tags($this->deposits));

        //bind data
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':slug', $this->slug);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':count', $this->count);
        $stmt->bindParam(':image', $this->image);
        $stmt->bindParam(':color', $this->color);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':deposits', $this->deposits);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error %s, \n" . $stmt->error);
        return false;
    }

    //delete data
    public function delete()
    {
        $query = "DELETE FROM full_color_car WHERE id =:id";

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
