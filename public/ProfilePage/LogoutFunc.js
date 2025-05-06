document.addEventListener("DOMContentLoaded", function () {
    ProfileLogout = document.querySelector("#Profile_LogoutButton");

    ProfileLogout.addEventListener('click', function() {
        fetch('/BegineerLuck_WebDev/public/LoginPage/auth_backend.php?action=logout', {
            method: 'POST'
        }). then(response => {
            if (response.ok) {
                alert('Logout successful');
                window.location.href = '/BegineerLuck_WebDev/public/LoginPage/Login.php';
            } else {
                console.error('Logout failed');
            }
        })
    });


});