<?php
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'));

$pib = $data->pib;
$phone = $data->phone;
$datas = json_encode($data->data, JSON_UNESCAPED_UNICODE);
$dateRecord = $data->date_record;
$timeRecord = $data->time_record;
$msql = "INSERT INTO records (pib, phone, data, date_record, time_record) VALUES ('$pib','$phone','$datas','$dateRecord','$timeRecord')";
if (isset($data)) {
    if (mysqli_query($conn, $msql)) {
        echo 'good';
    } else {
        echo 'fail';
    }
}
