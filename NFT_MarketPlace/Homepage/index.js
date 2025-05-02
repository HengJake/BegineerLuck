

document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".category");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const nftCarousel = document.querySelector(".nft-carousel");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");

  let currentCategory = "fire";
  let currentFilter = "popular";
  let currentSlide = 0;

  const nftData = [
    { id: 1, name: "Blaze Dragon", element: "fire", type: "popular", locked: false },
    { id: 2, name: "Inferno Wolf", element: "fire", type: "expensive", locked: true },
    { id: 3, name: "Steam Spirit", element: "water", type: "popular", locked: false },
    { id: 4, name: "Ocean Titan", element: "water", type: "expensive", locked: false },
    { id: 5, name: "Shadow Reaper", element: "shadow", type: "popular", locked: true },
    { id: 6, name: "Leaf Guardian", element: "grass", type: "popular", locked: false },
    { id: 7, name: "Whirlwind Fox", element: "wind", type: "expensive", locked: true }
  ];

  function renderNFTs() {
    const visibleNFTs = nftData.filter(nft => nft.element === currentCategory && nft.type === currentFilter);
    nftCarousel.innerHTML = "";

    if (visibleNFTs.length === 0) {
      nftCarousel.innerHTML = `<div class='nft-card empty'>No NFTs found</div>`;
      return;
    }

    visibleNFTs.forEach(nft => {
      const card = document.createElement("div");
      card.classList.add("nft-card");
      if (nft.locked) card.classList.add("locked");

      card.innerHTML = `
        <div class="nft-card-inner">
          <h4>${nft.name}</h4>
          <p>${nft.locked ? "🔒 Locked" : "✅ Unlocked"}</p>
        </div>
      `;

      card.addEventListener("click", () => {
        if (nft.locked) {
          alert("This NFT is locked. Unlock it by leveling up!");
        } else {
          alert(`Viewing ${nft.name}`);
        }
      });

      nftCarousel.appendChild(card);
    });
    updateSlide(0);
  }

  function updateSlide(index) {
    const cards = document.querySelectorAll(".nft-card");
    currentSlide = index;
    cards.forEach((card, i) => {
      card.style.transform = `translateX(${(i - index) * 110}%)`;
    });
  }

  prevBtn.addEventListener("click", () => {
    const cards = document.querySelectorAll(".nft-card");
    currentSlide = currentSlide === 0 ? cards.length - 1 : currentSlide - 1;
    updateSlide(currentSlide);
  });

  nextBtn.addEventListener("click", () => {
    const cards = document.querySelectorAll(".nft-card");
    currentSlide = currentSlide === cards.length - 1 ? 0 : currentSlide + 1;
    updateSlide(currentSlide);
  });

  categories.forEach(cat => {
    cat.addEventListener("click", () => {
      const isLocked = cat.querySelector(".status").classList.contains("locked");
      if (isLocked) {
        alert("This element is locked!");
        return;
      }
      categories.forEach(c => c.classList.remove("active"));
      cat.classList.add("active");
      currentCategory = cat.dataset.type;
      renderNFTs();
    });
  });

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderNFTs();
    });
  });

  renderNFTs();
});
