<?php

$connection = new mysqli("localhost","root","Lo80080413","hello_mango");
$table = $connection->query("SELECT * FROM `country`");

$country_array = array();


for($x=0;$x<$table->num_rows;$x++){

    $row = $table->fetch_assoc();
    array_push($country_array,$row["name"]);

}

$json = json_encode($country_array);
echo($json);

?>
