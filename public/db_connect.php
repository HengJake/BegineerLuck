<?php
// Start session (only if not already started)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Database connection settings
$servername = "localhost";
$username = "root"; // Default XAMPP username
$password = "";     // Default XAMPP password is empty
$database = "stickodessy"; // Your actual database name

// Create the connection
$conn = new mysqli($servername, $username, $password, $database);

// Check if connection failed
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Optional: Set character encoding to UTF-8
$conn->set_charset("utf8");
?>
