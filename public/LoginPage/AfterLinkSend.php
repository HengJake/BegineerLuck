<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php include_once __DIR__ . '/../headLinks.php'; ?>
</head>

<body class="Sent_Body">
    <div class="Sent_background"></div>
    <div class="Sent_title">
        <div>
            <h1 class="mb-3">A Reset Link has been sent to <strong><?php echo htmlspecialchars($_GET['email']) ?>'s</strong> inbox</h1>
            <div class="button-wrapper">
                <button><a href="Login.php">To Login</a></button>
            </div>
        </div>
    </div>
</body>

</html>