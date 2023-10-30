<?php

$requestJSON = $_POST["requestJSON"];
$requestObject = json_decode($requestJSON);

$from_id = $requestObject->from_user_id;
$to_id = $requestObject->to_user_id;
$message = $requestObject->message;
$date_time = date("Y-m-d H:i:s");

$connection = new mysqli("localhost","root","Lo80080413","hello_mango");

$connection->query("INSERT INTO `chat`(`user_from_id`,`user_to_id`,`message`,`date_time`,`status_id`)
VALUES('".$from_id."','".$to_id."','".$message."','".$date_time."','1')");


?>