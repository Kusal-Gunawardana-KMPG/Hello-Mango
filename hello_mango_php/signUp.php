<?php


$mobile = $_POST["mobile"];
$name = $_POST["name"];
$password = $_POST["password"];
$verifyPassword = $_POST["verifyPassword"];
$country = $_POST["country"];
$email = $_POST["email"];
$profile_picture_location = $_FILES["profile_picture"]["tmp_name"];


$connection = new mysqli("localhost","root","Lo80080413","hello_mango");

$table = $connection->query("SELECT `id` FROM `country` WHERE `name`='".$country."'");
$row = $table->fetch_assoc();
$country_id = $row["id"];


$connection->query("INSERT INTO `user`(`mobile`,`name`,`password`,`profile_url`,`country_id`,`email`)
VALUES('".$mobile."','".$name."','".$password."','"."Uploads/".$mobile.".png"."','".$country_id."','".$email."')");

move_uploaded_file($profile_picture_location,"Uploads/".$mobile.".png");

?>