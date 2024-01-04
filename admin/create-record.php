<?php
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'));

$pib = $data->pib;
$phone = $data->phone;
$datas = json_encode($data->datas);
$date_record = $data->date_record;
$time_record = $data->time_record;
// $sent_sms = $data->sent_sms;
$will_send_sms = $data->will_send_sms;
$will_send_sms_time = $data->$will_send_sms_time;


$msql = "INSERT INTO records (pib, phone, data, date_record, time_record, will_send_sms, will_send_sms_time ) VALUES ('$pib','$phone','$datas','$date_record','$time_record','$will_send_sms','$will_send_sms_time')";

if (mysqli_query($conn, $msql)) {
    echo 'good';
} else {
    echo 'fail';
}