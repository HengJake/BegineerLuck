<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include_once __DIR__ . '/../headLinks.php'; ?>
    <title>Stickman Odyssey: Log In</title>
</head>

<body class="Login_Body">
    <div class="Login_BackgroundImage"></div>

    <div class="flex-column flex-center">
        <h2 class="Login_Title text-center mb-3">Login</h2>

        <div class="Login_Container 1 flex-center flex-column hidden">
            <button class="Login_CloseForget btn" style="scale: 0.7;">
                <span class="material-icons">
                    close
                </span>
            </button>
            <form class="Login_ForgetPassword" action="auth_backend.php?action=ResetPassword" method="POST">
                <h3 class="mb-3">Reset Password</h3>
                <div class="flex-column">
                    <!-- Email input -->
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        class="mb-2">
                </div>

                <!-- Submit button -->
                <button type="submit" class="btn w-100">Request</button>
            </form>
        </div>

        <div class="Login_Container 2 flex-center flex-column ">

            <!-- === Error Message Section === -->
            <?php
            session_start();
            if (isset($_SESSION['error'])) {
                echo '<div class="error-message">' . htmlspecialchars($_SESSION['error']) . '</div>';
                unset($_SESSION['error']);
            }
            ?>

            <!-- === Login Form === -->
            <form class="w-100 Login_Form" action="auth_backend.php?action=login" method="POST">
                <p class="Login_SmallText w-100 text-left mb-3">
                    Don't have an account yet? <a href="Signup.php">Sign Up</a>
                </p>

                <input class="w-100 mb-2" type="text" name="username" placeholder="Username" required>

                <!-- Password Field with Eye Icon -->
                <div style="position: relative; width: 100%;" class="mb-1">
                    <input class="w-100" type="password" id="password" name="password" placeholder="Password" required>
                </div>

                <p class="Login_SmallText mb-3"><a class="Login_ForgetLink" href="#">Forgot Password?</a></p>

                <!-- Set up cookies

Forget Password -> user email https://www.youtube.com/watch?app=desktop&v=R9bfts9ZFjs -->

                <button class="btn w-100" type="submit">Login</button>
            </form>
        </div>
    </div>
</body>
<script src="Login.js"></script>


</html>