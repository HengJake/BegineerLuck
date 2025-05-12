// document.addEventListener("DOMContentLoaded", () => {
//   const categories = document.querySelectorAll(".category");
//   const filterButtons = document.querySelectorAll(".filter-btn");
//   const nftCarousel = document.querySelector(".nft-carousel");
//   const prevBtn = document.getElementById("prev-slide");
//   const nextBtn = document.getElementById("next-slide");

//   let currentCategory = "fire";
//   let currentFilter = "popular";
//   let currentSlide = 0;

//   const nftData = [
//     { id: 1, name: "Blaze Dragon", element: "fire", type: "popular", locked: false, img: "fire_unlocked2.jpg", page: "fire_unlocked2.jpg" },
//     { id: 2, name: "Inferno Wolf", element: "fire", type: "expensive", locked: true, img: "fire_locked2.jpg" },
//     { id: 3, name: "Steam Spirit", element: "water", type: "popular", locked: false, img: "water_unlocked1.jpg", page: "water_unlocked2.jpg" },
//     { id: 4, name: "Ocean Titan", element: "water", type: "expensive", locked: true, img: "water_locked1.jpg" },
//     { id: 5, name: "Shadow Reaper", element: "shadow", type: "popular", locked: true, img: "shadow_locked1.jpg" },
//     { id: 6, name: "Leaf Guardian", element: "grass", type: "popular", locked: false, img: "grass_unlocked1.jpg", page: "grass_unlocked2.jpg" },
//     { id: 7, name: "Whirlwind Fox", element: "wind", type: "expensive", locked: true, img: "wind_locked1.jpg" },
//     { id: 8, name: "Earth Golem", element: "earth", type: "popular", locked: true, img: "earth_locked1.jpg" },
//     { id: 9, name: "Rock Warrior", element: "earth", type: "expensive", locked: false, img: "earth_unlocked1.jpg", page: "earth_unlocked2.jpg" },
//     { id: 10, name: "Energy Sprite", element: "energy", type: "popular", locked: false, img: "energy_unlocked1.jpg", page: "energy_unlocked2.jpg" }
//   ];

//   function renderNFTs() {
//     const visibleNFTs = nftData.filter(nft => nft.element === currentCategory && nft.type === currentFilter);
//     nftCarousel.innerHTML = "";

//     if (visibleNFTs.length === 0) {
//       nftCarousel.innerHTML = `<div class="nft-card empty">No NFTs found</div>`;
//       return;
//     }

//     visibleNFTs.forEach(nft => {
//       const card = document.createElement("div");
//       card.classList.add("nft-card");
//       if (nft.locked) card.classList.add("locked");

//       card.innerHTML = `
//         <div class="nft-card-inner">
//           <img 
//             src="/BegineerLuck_WebDev/public/StickmanNFT/${nft.img}" 
//             alt="${nft.name}" 
//             class="nft-img"
//             onerror="this.src='/BegineerLuck_WebDev/public/img/placeholder.jpg'"
//           >
//           <h4>${nft.name}</h4>
//           <p>${nft.locked ? "🔒 Locked" : "✅ Unlocked"}</p>
//         </div>
//       `;

//       card.addEventListener("click", () => {
//         if (nft.locked) {
//           alert("This NFT is locked. Unlock it by leveling up!");
//         } else if (nft.page) {
//           // Redirect to character detail page in the new CharacterPage folder
//           window.location.href = `/BegineerLuck_WebDev/public/CharacterPage/CharacterPage.php?img=${nft.page}`;
//         }
//       });

//       nftCarousel.appendChild(card);
//     });

//     updateSlide(0);
//   }

//   function updateSlide(index) {
//     const cards = document.querySelectorAll(".nft-card");
//     currentSlide = index;
//     cards.forEach((card, i) => {
//       card.style.transform = `translateX(${(i - index) * 110}%)`;
//     });
//   }

//   prevBtn.addEventListener("click", () => {
//     const cards = document.querySelectorAll(".nft-card");
//     currentSlide = currentSlide === 0 ? cards.length - 1 : currentSlide - 1;
//     updateSlide(currentSlide);
//   });

//   nextBtn.addEventListener("click", () => {
//     const cards = document.querySelectorAll(".nft-card");
//     currentSlide = currentSlide === cards.length - 1 ? 0 : currentSlide + 1;
//     updateSlide(currentSlide);
//   });

//   categories.forEach(cat => {
//     cat.addEventListener("click", () => {
//       const isLocked = cat.querySelector(".status").classList.contains("locked");
//       if (isLocked) {
//         alert("This element is locked!");
//         return;
//       }

//       categories.forEach(c => c.classList.remove("active"));
//       cat.classList.add("active");
//       currentCategory = cat.dataset.type;
//       renderNFTs();
//     });
//   });

//   filterButtons.forEach(btn => {
//     btn.addEventListener("click", () => {
//       filterButtons.forEach(b => b.classList.remove("active"));
//       btn.classList.add("active");
//       currentFilter = btn.dataset.filter;
//       renderNFTs();
//     });
//   });

//   renderNFTs();
// });
