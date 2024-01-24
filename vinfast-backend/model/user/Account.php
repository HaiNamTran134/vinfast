<?php
class Account
{
    private $conn;

    // thông tin user
    public $id;
    public $name;
    public $avatar;
    public $email;
    public $phone;
    public $password;
    public $role;
    public $from;
    public $to;
    //connect db
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //read data
    public function read()
    {
        $query = "SELECT * FROM vinfast_account";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    //read top 5 data
    public function readTopAccount()
    {
        $query = "SELECT * FROM vinfast_account ORDER BY vinfast_account.id DESC LIMIT 5;";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    //show from day to day
    public function FromDayToDay()
    {
        $query = "SELECT * FROM vinfast_account WHERE DATE_FORMAT(date_create, '%Y-%m-%d') >= ? and DATE_FORMAT(date_create, '%Y-%m-%d') <= ?";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->from);
        $stmt->bindParam(2, $this->to);
        $stmt->execute();

        return $stmt;
    }

    //show data
    public function show()
    {
        $query = "SELECT * FROM vinfast_account WHERE id=? LIMIT 1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id = $row['id'];
        $this->avatar = $row['avatar'];
        $this->name = $row['name'];
        $this->email = $row['email'];
        $this->password = $row['password'];
        $this->role = $row['role'];
    }

    //create data
    public function create()
    {
        $query = "INSERT INTO vinfast_account SET name=:name, email=:email, password=:password";

        $stmt = $this->conn->prepare($query);

        //clean data
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));

        //bind data
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error %s, \n" . $stmt->error);
        return false;
    }

    //update data
    public function update()
    {
        $query = "UPDATE vinfast_account SET name=:name, phone=:phone, email=:email, password=:password, role:role WHERE id =:id";

        $stmt = $this->conn->prepare($query);

        //clean data
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->role = htmlspecialchars(strip_tags($this->role));
        $this->id = htmlspecialchars(strip_tags($this->id));

        //bind data
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':phone', $this->phone);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':role', $this->role);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }
        printf("Error %s, \n" . $stmt->error);
        return false;
    }

    //delete data
    public function delete()
    {
        $query = "DELETE FROM vinfast_account WHERE id =:id";

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
