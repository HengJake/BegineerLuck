document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("characterPage");
  
    // Fade-in is handled via CSS, but we can enhance it here if needed.
    container.style.opacity = 0;
    container.style.transform = "translateY(20px)";
  
    setTimeout(() => {
      container.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      container.style.opacity = 1;
      container.style.transform = "translateY(0)";
    }, 50);
  
    // Optional: Add toggle details feature
    const details = document.querySelector(".character-details");
  
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Details";
    toggleBtn.style.marginTop = "1rem";
    toggleBtn.style.padding = "0.4rem 0.8rem";
    toggleBtn.style.border = "none";
    toggleBtn.style.borderRadius = "5px";
    toggleBtn.style.backgroundColor = "#457b9d";
    toggleBtn.style.color = "white";
    toggleBtn.style.cursor = "pointer";
    toggleBtn.style.transition = "background 0.3s ease";
  
    toggleBtn.addEventListener("mouseenter", () => {
      toggleBtn.style.backgroundColor = "#1d3557";
    });
  
    toggleBtn.addEventListener("mouseleave", () => {
      toggleBtn.style.backgroundColor = "#457b9d";
    });
  
    toggleBtn.addEventListener("click", () => {
      const isVisible = details.style.display !== "none";
      details.style.display = isVisible ? "none" : "block";
    });
  
    container.appendChild(toggleBtn);
  });
  