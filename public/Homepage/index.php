<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include_once __DIR__ . '/../headLinks.php'; ?>
    <title>Marketplace</title>
</head>

<body>
    <div class="Homepage_Background"></div>

    <header class="Homepage_Header">
        <div class="Homepage_Directory">
            <h1 class="Homepage_Title">[name] Marketplace</h1>
            <input type="text" placeholder="Search...">
            <div class="flex">
            <a href="/BegineerLuck_WebDev/public/ProfilePage/Profile.php">
                <span class="material-icons-outlined">account_circle</span>
            </a>

            <a href="/BegineerLuck_WebDev/public/NFTDetailsPage/NFTDetails.php">
                <span class="material-icons-outlined">inventory_2</span>
            </a>

            </div>
        </div>

        <div class="Homepage_ShadeContainer">
            <div class="Homepage__ShadeThingie Red"></div>
            <div class="Homepage__ShadeThingie White"></div>
            <div class="Homepage__ShadeThingie Red"></div>
            <div class="Homepage__ShadeThingie White"></div>
            <div class="Homepage__ShadeThingie Red"></div>
            <div class="Homepage__ShadeThingie White"></div>
            <div class="Homepage__ShadeThingie Red"></div>
            <div class="Homepage__ShadeThingie White"></div>
            <div class="Homepage__ShadeThingie Red"></div>
            <div class="Homepage__ShadeThingie White"></div>
            <div class="Homepage__ShadeThingie Red"></div>
            <div class="Homepage__ShadeThingie White"></div>
        </div>
    </header>



    <main style="padding: 2rem; display: flex; flex-direction: row; gap: 2rem;">
        <!-- Sidebar -->
        <aside class="category-panel">
            <h3>Categories</h3>
            <ul>
                <li class="category" data-type="earth">Earth <span class="status locked">Locked</span></li>
                <li class="category" data-type="fire">Fire <span class="status unlocked">Unlocked</span></li>
                <li class="category" data-type="water">Water <span class="status unlocked">Unlocked</span></li>
                <li class="category" data-type="wind">Wind <span class="status locked">Locked</span></li>
                <li class="category" data-type="shadow">Shadow <span class="status locked">Locked</span></li>
                <li class="category" data-type="grass">Grass <span class="status unlocked">Unlocked</span></li>
                <li class="category" data-type="energy">Energy <span class="status unlocked">Unlocked</span></li>
            </ul>
        </aside>

        <!-- Main Content -->
        <section class="nft-display-panel">
            <!-- Filter buttons -->
            <div class="nft-filters">
                <button class="filter-btn active" data-filter="popular">POPULAR</button>
                <button class="filter-btn" data-filter="expensive">EXPENSIVE</button>
            </div>

            <!-- NFT Section -->
            <h2 class="section-title">POPULAR NFT</h2>
            <div class="nft-carousel">
                <div class="nft-card"></div>
                <div class="nft-card"></div>
                <div class="nft-card"></div>
            </div>
            <div class="nft-carousel-controls">
                <button id="prev-slide">&#9664;</button>
                <button id="next-slide">&#9654;</button>
            </div>
        </section>
    </main>

    <script src="index.js"></script>
</body>
</html>
