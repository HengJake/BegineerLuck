<?php

if (isset($_COOKIE['Username'])) {
    $name = $_COOKIE['Username'];
    echo "<script>window.location.href = '/BegineerLuck_WebDev/public/Homepage/index.php';alert(`Welcome back, {$name}!`);</script>";
    exit;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include_once __DIR__ . '/../headLinks.php'; ?>
    <title>Stickman Odyssey: Sign Up</title>
</head>

<body class="Login_Body">
    <div class="Login_BackgroundImage"></div>

    <div class="flex-column flex-center">
        <h2 class="SignUp_Title text-center mb-1">Sign Up</h2>
        <div class="SignUp_Container flex-center flex-column">

            <!-- === Error Message Section === -->
            <?php
            session_start();
            if (isset($_SESSION['error'])) {
                echo '<div class="error-message">' . htmlspecialchars($_SESSION['error']) . '</div>';
                unset($_SESSION['error']);
            }
            ?>

            <!-- === Signup Form === -->
            <form class="w-100" method="POST" action="auth_backend.php?action=signup" id="signupForm" enctype="multipart/form-data">
                <p class="Login_SmallText w-100 text-left mb-3">
                    Already have an account? <a href="Login.php">Log In</a>
                </p>

                <div class="mb-1">
                    <label for="username">Username *</label>
                    <input class="w-100 mb-2" type="text" name="username" placeholder="Username" required
                        minlength="3" maxlength="20" pattern="^[a-zA-Z0-9_]+$"
                        title="Username must be 3-20 characters and contain only letters, numbers, or underscores."
                        value="<?php echo $_SESSION['form_data']['username'] ?? ''; ?>">
                </div>

                <div class="mb-1">
                    <label for="email">Email *</label>
                    <!-- pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" -->
                    <input type="email" id="email" name="email" required
                        title="Enter a valid email address."
                        value="<?php echo $_SESSION['form_data']['email'] ?? ''; ?>">
                </div>

                <div class="mb-1">
                    <label for="password">Password *</label>
                    <input class="w-100" type="password" id="password" name="password" placeholder="Password" required
                        minlength="8"
                        title="Password must be at least 8 characters long.">
                </div>

                <div class="mb-1">
                    <label for="confirm_password">Confirm Password *</label>
                    <input type="password" id="confirm_password" name="confirm_password" required
                        oninput="this.setCustomValidity(this.value !== password.value ? 'Passwords do not match.' : '')"
                        title="Confirm password must match the password above.">
                </div>

                <div class="mb-1">
                    <label for="wallet_address">Wallet Address *</label>
                    <input type="text" id="wallet_address" name="wallet_address"
                        pattern="^0x[a-fA-F0-9]{40}$"
                        title="Enter a valid Ethereum address starting with 0x and followed by 40 hex characters."
                        required
                        value="<?php echo $_SESSION['form_data']['wallet_address'] ?? ''; ?>">
                </div>
                <!--     If no wallet => link to other wallet options -->

                <div class="mb-1">
                    <label for="profile_pic">Profile Picture (optional)</label>
                    <input type="file" id="profile_pic" name="profile_pic" accept="image/*">
                    <?php if (!empty($_SESSION['form_data']['profile_pic'])): ?>
                        <p>Selected file: <strong><?php echo basename($_SESSION['form_data']['profile_pic']); ?></strong></p>
                    <?php endif; ?>
                </div>

                <div class="mb-3">
                    <label for="bio">Bio (optional)</label>
                    <textarea id="bio" name="bio" rows="3" maxlength="300"
                        placeholder="Tell us about yourself (max 300 characters)..."><?php echo $_SESSION['form_data']['bio'] ?? ''; ?></textarea>
                </div>

                <button class="btn w-100" type="submit">Sign Up</button>
            </form>

        </div>
    </div>



    <script src="Signup.js"></script>
</body>

</html>