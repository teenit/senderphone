<?php header("Access-Control-Allow-Origin: *");
 $conn = mysqli_connect("localhost","itclubi1_senderphone","6Hahq?qO0v.=","itclubi1_senderphone");


if (mysqli_connect_errno()) {
  $objC->{'message'} = "Помилка з'єднання з базою даних";
  echo json_encode($objC);
  exit;
}

mysqli_set_charset($conn, "utf8mb4");
