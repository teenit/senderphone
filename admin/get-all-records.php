<?php 
require_once 'config.php';

$msql = 'SELECT * FROM `records`';
  
$records = mysqli_query($conn, $msql);

$mas = [];

 while ($res = mysqli_fetch_array($records)) {
    $id = $res['id'];
 
    $dec = json_decode($res['data']);

    $dec->id = $id;

       // $dec = json_encode($dec, JSON_UNESCAPED_UNICODE);
        $mas[] = $dec;     

}

mysqli_close($conn);

echo json_encode($mas, JSON_UNESCAPED_UNICODE);  