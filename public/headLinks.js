document.addEventListener("DOMContentLoaded", function () {
    console.log("headLinks.js loaded");

    const AlertBox = document.querySelector(".AlertBox");
    const AlertBoxBackground = document.querySelector(".AlertBoxContainer");
    const CloseAlert = document.querySelector("#CloseAlert");
    const AlertMessage = document.querySelector("#AlertMessage");
    const AlertTitle = document.querySelector("#AlertTitle");

    CloseAlert.addEventListener("click", function () {
        AlertBox.classList.add("offscreen");
        AlertBoxBackground.classList.add("offscreen");
    });

    // Expose globally so PHP can call it
    window.showCustomAlert = function (title, message, goTo) {
        AlertTitle.textContent = title;
        AlertMessage.textContent = message;

        AlertBox.classList.remove("offscreen");
        AlertBoxBackground.classList.remove("offscreen");

        CloseAlert.addEventListener("click", function () {
            AlertBox.classList.add("offscreen");
            AlertBoxBackground.classList.add("offscreen");
            if (goTo) {
                window.location.href = goTo;
            }
        });

        setTimeout(() => {
            AlertBox.classList.add("offscreen");
            AlertBoxBackground.classList.add("offscreen");
            if (goTo) {
                window.location.href = goTo;
            }
        }, 3000);
    };
});