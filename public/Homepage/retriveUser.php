<?php
include __DIR__ . '/../db_connect.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Connection check
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//  else {
//     echo "Connected successfully<br>";
// }

// Database check
$db_selected = $conn->query("SELECT DATABASE()")->fetch_row()[0];
// echo "Currently using database: " . $db_selected . "<br>";

// Query
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if (!$result) {
    die("SQL Error: " . $conn->error);
} else {
    // echo "Query successful<br>";
    // echo "Number of rows: " . $result->num_rows . "<br>";
}

$users = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    
    foreach ($users as &$user) {
        if (!empty($user['profile_pic'])) {
            $user['profile_pic'] = 'data:image/jpeg;base64,' . base64_encode($user['profile_pic']);
        } else {
            $user['profile_pic'] = 'default-profile.png'; // fallback image path
        }
    }
} else {
    echo "No users found.<br>";
}

header('Content-Type: application/json');
echo json_encode($users);
