<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="\BegineerLuck_WebDev\NFT_MarketPlace\general.css">
    <title>Stickman Odyssey: Sign Up</title>
</head>

<body class="Login_Body">
    <div class="Login_BackgroundImage"></div>

    <div class="flex-column flex-center">
        <h2 class="Login_Title text-center mb-3">Sign Up</h2>
        <div class="Login_Container flex-center flex-column">

            <!-- === Error Message Section === -->
            <?php
            session_start();
            if (isset($_SESSION['error'])) {
                echo '<div class="error-message">' . htmlspecialchars($_SESSION['error']) . '</div>';
                unset($_SESSION['error']);
            }
            ?>
            <button id="testButton">test</button>
            <!-- === Signup Form === -->
            <form class="w-100" method="POST" id="signupForm">
                <p class="Login_SmallText w-100 text-left mb-3">
                    Already have an account? <a href="Login.php">Log In</a>
                </p>

                <div>
                    <input class="w-100 mb-2" type="text" name="username" placeholder="Username" required
                        minlength="3" maxlength="20" pattern="^[a-zA-Z0-9_]+$"
                        title="Username must be 3-20 characters and contain only letters, numbers, or underscores."
                        value="<?php echo $_SESSION['form_data']['username'] ?? ''; ?>">
                </div>

                <div>
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        title="Enter a valid email address."
                        value="<?php echo $_SESSION['form_data']['email'] ?? ''; ?>">
                </div>

                <div>
                    <label for="password">Password *</label>
                    <input class="w-100" type="password" id="password" name="password" placeholder="Password" required
                        minlength="8"
                        title="Password must be at least 8 characters long.">
                </div>

                <div>
                    <label for="confirm_password">Confirm Password *</label>
                    <input type="password" id="confirm_password" name="confirm_password" required
                        oninput="this.setCustomValidity(this.value !== password.value ? 'Passwords do not match.' : '')"
                        title="Confirm password must match the password above.">
                </div>

                <div>
                    <label for="wallet_address">Wallet Address *</label>
                    <input type="text" id="wallet_address" name="wallet_address"
                        pattern="^0x[a-fA-F0-9]{40}$"
                        title="Enter a valid Ethereum address starting with 0x and followed by 40 hex characters."
                        required
                        value="<?php echo $_SESSION['form_data']['wallet_address'] ?? ''; ?>">
                </div>

                <div>
                    <label for="profile_pic">Profile Picture (optional)</label>
                    <input type="file" id="profile_pic" name="profile_pic" accept="image/*">
                    <?php if (!empty($_SESSION['form_data']['profile_pic'])): ?>
                        <p>Selected file: <strong><?php echo basename($_SESSION['form_data']['profile_pic']); ?></strong></p>
                    <?php endif; ?>
                </div>

                <div>
                    <label for="bio">Bio (optional)</label>
                    <textarea id="bio" name="bio" rows="3" maxlength="300"
                        placeholder="Tell us about yourself (max 300 characters)..."><?php echo $_SESSION['form_data']['bio'] ?? ''; ?></textarea>
                </div>

                <p class="Login_SmallText mb-3"><a href="#">Forgot Password?</a></p>

                <button class="btn w-100" type="submit">Sign Up</button>
            </form>


        </div>
    </div>

    <script src="Signup.js"></script>
</body>

</html>