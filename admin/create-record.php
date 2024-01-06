<?php
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'));

$pib = $data->pib;
$phone = $data->phone;
$datas = json_encode($data->data, JSON_UNESCAPED_UNICODE);

$msql = "INSERT INTO records (pib, phone, data) VALUES ('$pib','$phone','$datas')";
if (isset($data)) {
    if (mysqli_query($conn, $msql)) {
        echo 'good';
    } else {
        echo 'fail';
    }
}
