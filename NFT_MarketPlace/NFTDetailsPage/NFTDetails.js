document.addEventListener("DOMContentLoaded", () => {

    
    const pages = document.querySelectorAll(".Details_BookPage");
    const nextButton = document.querySelector(".Details_Button.foward");
    const backButton = document.querySelector(".Details_Button.back");
    let currentPage = 0;

    function flipPage(direction) {
        if (direction === "next" && currentPage < pages.length - 1) {
            pages[currentPage].classList.add("flip-next");
            currentPage++;
        } else if (direction === "prev" && currentPage > 0) {
            pages[currentPage].classList.add("flip-prev");
            currentPage--;
        }
    }

    nextButton.addEventListener("click", () => flipPage("next"));
    backButton.addEventListener("click", () => flipPage("prev"));
});