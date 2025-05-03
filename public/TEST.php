<?php
// view_image.php?id=123
require 'db_connect.php';  // Your DB connection

$id = 9;
$stmt = $conn->prepare("SELECT profile_pic FROM users WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($profile_pic);
    $stmt->fetch();
    
    header("Content-Type: image/jpeg");  // or image/png based on what you store
    echo $profile_pic;
} else {
    http_response_code(404);
    echo "Image not found.";
}
?>
