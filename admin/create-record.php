<?php
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'));

$pib = $data->pib;
$phone = $data->phone;
$datas = json_encode($data->data);
$date_record = $data->date_record;
$time_record = $data->time_record;
$sent_sms = $data->sent_sms;
$will_send_sms = $data->will_send_sms;


$msql = "INSERT INTO records (pib, phone, data, date_record, time_record, sent_sms, will_send_sms) VALUES ('$pib','$phone','$datas','$date_record','$time_record','$sent_sms','$will_send_sms')";

if (mysqli_query($conn, $msql)) {
    echo 'good';
} else {
    echo 'fail';
}