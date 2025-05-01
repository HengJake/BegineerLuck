<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="\BegineerLuck_WebDev\NFT_MarketPlace\general.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
    <title>Marketplace</title>
</head>

<body>
    <div class="Homepage_Background"></div>

    <header class="Homepage_Header">
        <div class="Homepage_Directory">
            <h1 class="Homepage_Title">[name] Marketplace</h1>
            <input type="text" placeholder="Search...">
            <div class="flex">
                <a href="\BegineerLuck_WebDev\NFT_MarketPlace\ProfilePage\Profile.php">
                    <span class="material-icons-outlined">account_circle</span>
                </a>
                <a href="\BegineerLuck_WebDev\NFT_MarketPlace\NFTDetailsPage\NFTDetails.php">
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
        <aside style="width: 20%; background: rgba(255, 255, 255, 0.7); border-radius: 10px; padding: 1rem;">
            <h3>Categories</h3>
            <!-- Future categories here -->
        </aside>

        <!-- Main Content -->
        <section style="flex: 1; background: rgba(255, 255, 255, 0.7); border-radius: 10px; padding: 1rem;">
            <!-- Filter buttons -->
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                <button style="padding: 0.5rem 1rem; border: none; background-color: #e63946; color: white; border-radius: 5px;">POPULAR</button>
                <button style="padding: 0.5rem 1rem; border: none; background-color: #e63946; color: white; border-radius: 5px;">EXPENSIVE</button>
            </div>

            <!-- Popular NFTs -->
            <h2 style="margin-bottom: 1rem;">POPULAR NFT</h2>

            <div style="display: flex; gap: 1rem;">
                <div style="flex: 1; height: 200px; background-color: #f5f5f5; border: 2px solid black; border-radius: 10px;"></div>
                <div style="flex: 1; height: 200px; background-color: #f5f5f5; border: 2px solid black; border-radius: 10px;"></div>
                <div style="flex: 1; height: 200px; background-color: #f5f5f5; border: 2px solid black; border-radius: 10px;"></div>
            </div>
        </section>
    </main>

</body>

</html>
