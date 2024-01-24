<?php
class Product
{
    private $conn;

    // thông tin block1
    public $id;
    public $slug;
    public $title;
    public $image1;
    public $image3;
    public $image5;
    public $image6;
    public $categorySlug;
    public $dongcoBMW;
    public $description;
    public $hopSo;
    public $camGiacLai;
    public $congSuat;
    public $thietkeNgoaiThat;
    public $thietkeNgoaiThat2;
    public $thietkeNgoaiThat3;
    public $voLangCamXuc;
    public $daTienIch;
    public $giaiTri;
    public $thietKeNoiThat;
    public $thietKeNoiThat2;
    public $thietKeNoiThat3;
    public $dongCoCN;
    public $dongCoCN1;
    public $daiRongCao;
    public $chieuDai;
    public $moMen;
    public $khoangSang;
    public $dungTich;
    public $mucTieuThu;
    public $danDong;

    //connect db
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //read data
    public function read()
    {
        $query = "SELECT * FROM products";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }
}
