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

                    setcookie("UID", $user['id'], time() + 3600, "/");
                    setcookie("Username", $username, time() + 3600, "/");
                    setcookie("WalletAddress", $user['wallet_address'], time() + 3600, "/");

                    $_SESSION['username'] = $username;

                    echo "<script>window.alert('Login successful! Welcome back $username');</script>";
                    header('Location: /BegineerLuck_WebDev/public/Homepage/index.php');
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
            $errors = [];

            // Default profile picture/ handle file upload
            if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] === UPLOAD_ERR_OK) {
                $profile_pic = file_get_contents($_FILES['profile_pic']['tmp_name']); // Get binary content
            } else {
                $profile_pic = file_get_contents(__DIR__ . "/../../public/img/DefaultPfp.png");
            }

            echo "<script>window.alert('Please fill in all required fields.');</script>";
            // === Validation ===
            if (empty($username) || empty($email) || empty($password) || empty($confirm_password)) {
                $errors[] = "Please fill in all required fields.";
                header('Location: Signup.php');
                exit();
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $errors[] = "Invalid email format.";
                header('Location: Signup.php');
                exit();
            }

            if ($password !== $confirm_password) {
                $errors[] = "Passwords do not match.";
                header('Location: Signup.php');
                exit();
            }

            if (strlen($username) < 4 || strlen($password) < 6) {
                $errors[] = "Username needs to be at least 4 characters long and password at least 6 characters long.";
                header('Location: Signup.php');
                exit();
            }

            // === Preserve form values ===
            $_SESSION['form_data'] = [
                'username' => $username,
                'email' => $email,
                'wallet_address' => $wallet_address,
                'bio' => $bio
            ];

            // === Uniqueness Checks ===
            $checkUsername = $conn->prepare("SELECT id FROM users WHERE username = ?");
            $checkUsername->bind_param("s", $username);
            $checkUsername->execute();
            if ($checkUsername->get_result()->num_rows > 0) {
                $errors[] = "Username already taken.";
            }

            $checkEmail = $conn->prepare("SELECT id FROM users WHERE email = ?");
            $checkEmail->bind_param("s", $email);
            $checkEmail->execute();
            if ($checkEmail->get_result()->num_rows > 0) {
                $errors[] = "Email is already registered.";
            }

            if (!empty($wallet_address)) {
                $checkWallet = $conn->prepare("SELECT id FROM users WHERE wallet_address = ?");
                $checkWallet->bind_param("s", $wallet_address);
                $checkWallet->execute();
                if ($checkWallet->get_result()->num_rows > 0) {
                    $errors[] = "Wallet address is already registered.";
                }
            }

            if (!empty($errors)) {
                $_SESSION['error'] = implode("<br>", $errors);
                header("Location: Signup.php");
                exit();
            }

            // === Insert User ===
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $sql = "INSERT INTO users (username, email, password_hash, wallet_address, profile_pic, bio)
                        VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->send_long_data(4, $profile_pic);
            $stmt->bind_param("ssssss", $username, $email, $hashed_password, $wallet_address, $profile_pic, $bio);

            if ($stmt->execute()) {
                unset($_SESSION['form_data']); // Clear after success

                // set cookies here
                $user_id = $conn->insert_id;
                setcookie("UID", $user_id, time() + 3600, "/");
                setcookie("Username", $username, time() + 3600, "/");
                setcookie("WalletAddress", $wallet_address, time() + 3600, "/");
                $_SESSION['username'] = $username;

                header('Location: /BegineerLuck_WebDev/public/Homepage/index.php');
                exit();
            } else {
                $_SESSION['error'] = "Signup failed: " . $stmt->error;
                header('Location: Signup.php');
                exit();
            }
        }
        break;

    case 'ResetPassword':
        $mail = require_once 'mailer.php'; // Adjust the path as necessary

        $email = $_POST['email'];
        $token = bin2hex(random_bytes(16));
        $token_hash = hash('sha256', $token);
        // token last 10 minutes
        $expiry = date("Y-m-d H:i:s", time() + 60 * 10);

        $sql = "UPDATE users SET reset_token_hash = ?, reset_token_expires_at = ? WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $token_hash, $expiry, $email);
        $stmt->execute();

        if ($conn->affected_rows > 0) {
            $mail->setFrom('noreply@example.com');
            $mail->addAddress($email);
            $mail->Subject = 'Password Reset Request';
            $mail->Body = "Click the link to reset your password: <a href='http://localhost:8081/BegineerLuck_WebDev/public/LoginPage/ResetPasswordPage.php?token=$token'>Reset Password</a>";
            try {
                $mail->send();
                echo "Reset link sent to your email.";
            } catch (Exception $e) {
                echo "Mailer Error: " . $mail->ErrorInfo;
            }
        } else {
            echo "Email not found.";
        }
        echo "<script>window.location='AfterLinkSend.php?email={$email}'</script>";
        echo "<script>window.alert('If the email is registered, a reset link has been sent.');</script>";
        break;

    case 'ResetPassword2':
        $token = $_POST['token'];

        $token_hash = hash('sha256', $token);

        require_once '../db_connect.php';

        $sql = " SELECT * FROM users WHERE reset_token_hash = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $token_hash);
        $stmt->execute();

        $result = $stmt->get_result();

        $user = $result->fetch_assoc();

        if (!$user) {
            die("Invalid token or token has expired.");
        }

        if (strtotime($user["reset_token_expires_at"]) <= time()) {
            die("Token has expired.");
        }

        if ($_POST['password'] !== $_POST['password2']) {
            echo "<script>window.alert('Passwords do not match.');</script>";
            break;
        }

        $password_hash = password_hash($_POST['password'], PASSWORD_DEFAULT);
        $sql = "UPDATE users SET password_hash = ?, reset_token_hash = NULL, reset_token_expires_at = NULL WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $password_hash, $user['id']);
        $stmt->execute();
        echo "<script>window.alert('Password reset successfully. You can now log in.');</script>";
        echo "<script>window.location.href = 'Login.php';</script>";
        exit();

        break;
    case 'CancelResetToken':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $token = $_POST['token'] ?? '';
            if ($token) {
                $token_hash = hash('sha256', $token);
                require_once '../db_connect.php';

                $sql = " SELECT * FROM users WHERE reset_token_hash = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("s", $token_hash);
                $stmt->execute();

                $result = $stmt->get_result();

                $user = $result->fetch_assoc();

                if (!$user) {
                    die("Invalid token or token has expired.");
                }

                if (strtotime($user["reset_token_expires_at"]) <= time()) {
                    die("Token has expired.");
                }

                $sql = "UPDATE users SET reset_token_hash = NULL, reset_token_expires_at = NULL WHERE id = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("s", $user['id']);
                $stmt->execute();
                echo "<script>window.alert('Password reset successfully. You can now log in.');</script>";
            }
            http_response_code(200);
            exit();
        }
        break;
    case 'logout':
        // Clear cookies and session
        setcookie("UID", "", time() - 3600, "/");
        setcookie("Username", "", time() - 3600, "/");
        setcookie("WalletAddress", "", time() - 3600, "/");
        unset($_SESSION['username']);
        session_destroy();
        exit();
        break;

    default:
        echo "Invalid action.";
        break;
}
