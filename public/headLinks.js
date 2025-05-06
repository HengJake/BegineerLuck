document.addEventListener("DOMContentLoaded", function () {
    console.log("headLinks.js loaded");

    const AlertBox = document.querySelector(".AlertBox");
    const AlertBoxBackground = document.querySelector(".AlertBoxContainer");
    const CloseAlert = document.querySelector("#CloseAlert");
    
    CloseAlert.addEventListener("click", function () {
        AlertBox.classList.add("offscreen");
        AlertBoxBackground.classList.add("offscreen");
    });

    function showCustomAlert(title, message) {
        const AlertBox = document.querySelector(".AlertBox");
        const AlertBoxBackground = document.querySelector(".AlertBoxContainer");
        const CloseAlert = document.querySelector("#CloseAlert");
        const AlertMessage = document.querySelector("#AlertMessage");
        const AlertTitle = document.querySelector("#AlertTitle");

        AlertBox.classList.remove("offscreen");
        AlertBoxBackground.classList.remove("offscreen");
        
        AlertMessage.textContent = message;
        AlertTitle.textContent = title;
    
    
        CloseAlert.addEventListener("click", function () {
            AlertBox.classList.add("offscreen");
            AlertBoxBackground.classList.add("offscreen");
        });

        // Optional: Auto-close after 3 seconds
        setTimeout(() => {
            AlertBox.classList.add("offscreen");
            AlertBoxBackground.classList.add("offscreen");
        }, 3000);
      }
});