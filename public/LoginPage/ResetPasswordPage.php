<?php
$token = $_GET['token'];

$token_hash = hash('sha256', $token);

require_once '../db_connect.php';

$sql = " SELECT * FROM users WHERE reset_token_hash = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $token_hash);
$stmt->execute();

$result = $stmt->get_result();

$user = $result->fetch_assoc();

if (!$user) {
    echo "<script>alert('Invalid token or token has expired.');</script>";
    echo "<script>window.location.href = 'Login.php';</script>";
}

if (strtotime($user["reset_token_expires_at"]) <= time()) {
    echo "<script>alert('Token has expired.');</script>";
    echo "<script>window.location.href = 'Login.php';</script>";
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include_once __DIR__ . '/../headLinks.php'; ?>
    <title>Password Reset</title>
</head>

<body>
    <div class="Reset_Background"></div>
    <form class="Reset_Form" method="POST" action="auth_backend.php?action=ResetPassword2">
        <input id="token" type="hidden" name="token" value="<?php echo $token; ?>" required>

        <div>
            <label for="password">New Password *</label>
            <input class="mb-3" type="password" name="password" id="password" required>

            <label for="password2">Confirmation Password *</label>
            <input class="mb-3" type="password" name="password2" id="password2" required>

            <button class="mb-1">Confirm Reset</button>
            <button class="Reset_Cancel">Cancel</button>
        </div>
        <script>
            document.querySelector('.Reset_Cancel').addEventListener('click', async function(event) {
                event.preventDefault(); // Prevent default form action
                const token = document.querySelector('#token').value;

                // Send a request to cancel the reset token
                await fetch('auth_backend.php?action=CancelResetToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'token=' + encodeURIComponent(token)
                });

                // Redirect to login after cancel
                window.location.href = 'Login.php';
            });
        </script>
    </form>
</body>

</html>