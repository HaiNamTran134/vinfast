<?php
class Customer
{
    private $conn;

    // thông tin customer
    public $id;
    public $order_id;
    public $name_car;
    public $color_car;
    public $image_car;
    public $name;
    public $phone;
    public $cccd;
    public $email;
    public $province;
    public $money_deposit;
    public $price;
    public $note;
    public $file;
    public $published_at;
    public $status;
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
        $query = "SELECT * FROM vinfast_customer ORDER BY vinfast_customer.published_at DESC";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    //read top 5 data
    public function readTopCustomer()
    {
        $query = "SELECT * FROM vinfast_customer ORDER BY vinfast_customer.published_at DESC LIMIT 5";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    //read count customer in current month
    public function readMonth()
    {
        $query = "SELECT SUM(price) as total FROM vinfast_customer WHERE vinfast_customer.status = 'accept'";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }

    //show from day to day
    public function FromDayToDay()
    {
        $query = "SELECT * FROM vinfast_customer WHERE DATE_FORMAT(published_at, '%Y-%m-%d') >= ? and DATE_FORMAT(published_at, '%Y-%m-%d') <= ?";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->from);
        $stmt->bindParam(2, $this->to);
        $stmt->execute();

        return $stmt;
    }

    //show data by id
    public function show()
    {
        $query = "SELECT * FROM vinfast_customer WHERE id = ? LIMIT 1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->id = $row['id'];
        $this->order_id = $row['order_id'];
        $this->name_car = $row['name_car'];
        $this->color_car = $row['color_car'];
        $this->name = $row['name'];
        $this->phone = $row['phone'];
        $this->cccd = $row['cccd'];
        $this->email = $row['email'];
        $this->province = $row['province'];
        $this->money_deposit = $row['money_deposit'];
        $this->price = $row['price'];
        $this->note = $row['note'];
        $this->file = $row['file'];
        $this->published_at = $row['published_at'];
        $this->status = $row['status'];
    }

    //show data by user
    public function showByUser()
    {
        $query = "SELECT * FROM vinfast_customer WHERE vinfast_customer.email = ?";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->email);
        $stmt->execute();

        return $stmt;
    }

    //update data
    public function update()
    {
        $query = "UPDATE vinfast_customer SET status=:status WHERE id =:id";

        $stmt = $this->conn->prepare($query);

        //clean data
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->id = htmlspecialchars(strip_tags($this->id));

        //bind data
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':id', $this->id);
        if ($stmt->execute()) {
            return true;
        }
        printf("Error %s, \n" . $stmt->error);
        return false;
    }
}
