<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');

include_once('../config/contacts.php');
include_once('../model/product.php');

$db = new db();
$connect = $db->connect();

$product = new Product($connect);
$read = $product->read();

$num = $read->rowCount();

if ($num > 0) {
    $product_array = [];
    $product_array['data'] = [];

    while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $product_item = array(
            'id' => $id,
            'slug' => $slug,
            'title' => $title,
            'image1' => $image1,
            'image3' => $image3,
            'image5' => $image5,
            'image6' => $image6,
            'categorySlug' => $categorySlug,
            'dongcoBMW' => $dongcoBMW,
            'description' => $description,
            'hopSo' => $hopSo,
            'camGiacLai' => $camGiacLai,
            'congSuat' => $congSuat,
            'thietkeNgoaiThat' => $thietKeNoiThat,
            'thietkeNgoaiThat2' => $thietKeNoiThat2,
            'thietkeNgoaiThat3' => $thietKeNoiThat3,
            'voLangCamXuc' => $voLangCamXuc,
            'daTienIch' => $daTienIch,
            'giaiTri' => $giaiTri,
            'thietKeNoiThat' => $thietKeNoiThat,
            'thietKeNoiThat2' => $thietKeNoiThat2,
            'thietKeNoiThat3' => $thietKeNoiThat3,
            'dongCoCN' => $dongCoCN,
            'dongCoCN1' => $dongCoCN1,
            'daiRongCao' => $daiRongCao,
            'chieuDai' => $chieuDai,
            'moMen' => $moMen,
            'khoangSang' => $khoangSang,
            'dungTich' => $dungTich,
            'mucTieuThu' => $mucTieuThu,
            'danDong' => $danDong,
        );
        array_push($product_array['data'], $product_item);
    }
    echo json_encode(($product_array));
}
