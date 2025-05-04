document.addEventListener("DOMContentLoaded", function () {
    const ForgetPassword = document.querySelector(".Login_ForgetLink");
    const CloseForgetForm = document.querySelector(".Login_CloseForget");
    const ForgetForm = document.querySelectorAll(".Login_Container")[0];
    const LoginForm = document.querySelectorAll(".Login_Container")[1];


    // transition for forget password form
    ForgetPassword.addEventListener('click', function() {
        ForgetForm.classList.remove('hidden')
        LoginForm.classList.add('hidden')
    });
    
    CloseForgetForm.addEventListener('click', function() {
        ForgetForm.classList.add('hidden')
        LoginForm.classList.remove('hidden')
    });


});