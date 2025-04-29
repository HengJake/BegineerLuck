<?php
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
                if (password_verify($password, $user['password'])) {
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
            $password = $_POST['password'];

            if (empty($username) || empty($password)) {
                $_SESSION['error'] = "Please fill in all fields.";
                header('Location: Signup.php');
                exit();
            }

            if (strlen($username) < 4) {
                $_SESSION['error'] = "Username must be at least 4 characters.";
                header('Location: Signup.php');
                exit();
            }

            if (strlen($password) < 6) {
                $_SESSION['error'] = "Password must be at least 6 characters.";
                header('Location: Signup.php');
                exit();
            }

            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);

            if (!$stmt) {
                $_SESSION['error'] = "Signup failed: " . $conn->error;
                header('Location: Signup.php');
                exit();
            }

            $stmt->bind_param("ss", $username, $hashed_password);

            if (!$stmt->execute()) {
                $_SESSION['error'] = "Signup failed: " . $stmt->error;
                header('Location: Signup.php');
                exit();
            }

            $_SESSION['username'] = $username;
            header('Location: /BegineerLuck_WebDev/NFT_MarketPlace/Homepage/index.php');
            exit();
        }
        break;

    default:
        echo "Invalid action.";
        break;
}
?>
