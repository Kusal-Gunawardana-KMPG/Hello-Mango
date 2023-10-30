<?php

$userJSONText = $_POST["userJSONText"];
$userPHPObject = json_decode($userJSONText);

$connection = new mysqli("localhost","root","Lo80080413","hello_mango");

// $table = $connection->query("SELECT * FROM `user` WHERE `id` !='".$userPHPObject->id."'");

$table = $connection->query("SELECT * FROM `user` WHERE `id` !='".$userPHPObject->id."' AND `name` LIKE '".$_POST["text"]."%'");

$phpResponseArray = array();

for($x=1;$x<$table->num_rows;$x++){
 
    $phpArrayItemObject = new stdClass();

    $user = $table->fetch_assoc();
    $phpArrayItemObject->pic = $user["profile_url"];
    $phpArrayItemObject->name = $user["name"];

    $phpArrayItemObject->id = $user["id"];

    $table2 = $connection->query("SELECT * FROM `chat` WHERE
    `user_from_id`='".$userPHPObject->id."' AND `user_to_id`='".$user["id"]."'
    OR
    `user_from_id`='".$user["id"]."' AND `user_to_id`='".$userPHPObject->id."'
    ORDER BY `date_time` DESC");

    if($table2->num_rows==0){ //No Conversation Yet
        $phpArrayItemObject->msg = "Tap to start chat.";
        $phpArrayItemObject->time = "";
        $phpArrayItemObject->count = "0";
    }else{

        //unseen chat count
        $unseenChatCount = 0;

        //first row
        $lastChatRow = $table2->fetch_assoc(); // Last Message is picked From Fetch Assoc
        if($lastChatRow["status_id"]==1){
            $unseenChatCount++;
        }

        $phpArrayItemObject->msg = $lastChatRow["message"];

        $phpDateTimeObject = strtotime($lastChatRow["date_time"]);
        $timeStr = date('h:i a',$phpDateTimeObject);

        $phpArrayItemObject->time = $timeStr;

        for($i=1;$i<$table2->num_rows;$i++){
            //other rows
            $newChatRow = $table2->fetch_assoc();
            if($newChatRow["status_id"]==1){
                $unseenChatCount++;
            }
        } 

        $phpArrayItemObject->count = $unseenChatCount;
    }

    array_push($phpResponseArray,$phpArrayItemObject);

}

$jsonResponseText = json_encode($phpResponseArray);
echo($jsonResponseText);

?>