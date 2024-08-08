<?php

require './dbconn.php';
require './Item.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $stmt = "select * from products;";
    $result = $conn->query($stmt);
    if ($result->num_rows) {
        $array = array();
        while ($row = $result->fetch_assoc()) {
            array_push($array, new Item($row['id'], $row['title'], $row['price'], $row['image']));
        }
        echo json_encode($array);
    }
    else echo "Something went wrong. Try again later!!!";
    exit();

}
