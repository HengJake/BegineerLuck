<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

$servername = "localhost";
$username = "root";
$password = "";
$database = "stickodessy";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'login':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $username = trim($_POST['username']);
            $password = $_POST['password'];

            if (empty($username) || empty($password)) {
                $_SESSION['error'] = "Please enter both username and password.";
                header('Location: Login.php');
                exit();
            }

            $sql = "SELECT * FROM users WHERE username = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($user = $result->fetch_assoc()) {
                if (password_verify($password, $user['password_hash'])) {
                    $_SESSION['username'] = $username;
                    header('Location: /BegineerLuck_WebDev/NFT_MarketPlace/Homepage/index.php');
                    exit();
                } else {
                    $_SESSION['error'] = "Invalid username or password.";
                    header('Location: Login.php');
                    exit();
                }
            } else {
                $_SESSION['error'] = "Invalid username or password.";
                header('Location: Login.php');
                exit();
            }
        }
        break;

    case 'signup':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $username = trim($_POST['username']);
            $email = trim($_POST['email']);
            $password = $_POST['password'];
            $confirm_password = $_POST['confirm_password'];
            $wallet_address = trim($_POST['wallet_address'] ?? '');
            $bio = trim($_POST['bio'] ?? '');
            $profile_pic_path = null;

            // Validation
            if (empty($username) || empty($email) || empty($password) || empty($confirm_password)) {
                $_SESSION['error'] = "Please fill in all required fields.";
                header('Location: Signup.php');
                exit();
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $_SESSION['error'] = "Invalid email format.";
                header('Location: Signup.php');
                exit();
            }

            if ($password !== $confirm_password) {
                $_SESSION['error'] = "Passwords do not match.";
                header('Location: Signup.php');
                exit();
            }

            if (strlen($username) < 4 || strlen($password) < 6) {
                $_SESSION['error'] = "Username must be ≥ 4 chars and password ≥ 6 chars.";
                header('Location: Signup.php');
                exit();
            }

            // Handle profile picture upload
            if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] === UPLOAD_ERR_OK) {
                $target_dir = "uploads/profile_pics/";
                if (!file_exists($target_dir)) mkdir($target_dir, 0755, true);

                $ext = pathinfo($_FILES['profile_pic']['name'], PATHINFO_EXTENSION);
                $filename = uniqid("pfp_", true) . "." . $ext;
                $profile_pic_path = $target_dir . $filename;

                move_uploaded_file($_FILES['profile_pic']['tmp_name'], $profile_pic_path);
            }

            // Hash password
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            // Insert into database
            $sql = "INSERT INTO users (username, email, password_hash, wallet_address, profile_pic, bio) 
                        VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);

            if (!$stmt) {
                $_SESSION['error'] = "Signup failed: " . $conn->error;
                header('Location: Signup.php');
                exit();
            }

            $stmt->bind_param("ssssss", $username, $email, $hashed_password, $wallet_address, $profile_pic_path, $bio);

            if ($stmt->execute()) {
                $_SESSION['username'] = $username;
                header('Location: /BegineerLuck_WebDev/NFT_MarketPlace/Homepage/index.php');
                exit();
            } else {
                $_SESSION['error'] = "Signup failed: " . $stmt->error;
                header('Location: Signup.php');
                exit();
            }
        }
        break;

    default:
        echo "Invalid action.";
        break;
}
