<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include_once __DIR__ . '/../headLinks.php'; ?>
    <title>Marketplace</title>

    <!-- PHP -->
    <?php
    define('BASE_URL', '/BegineerLuck_WebDev/public/');
    $marketName = 'Elemental'; // You can change this to fit your project

    // make sure include the headlinks.php file
    if (!isset($_COOKIE['UID'])) {
        echo "<script>
            document.addEventListener('DOMContentLoaded', function () {
                    showCustomAlert('Please Login', 'You must be logged in to continue.', '/BegineerLuck_WebDev/public/LoginPage/Login.php');
            });
        </script>";
        exit;
    }
    ?>
</head>

<body>
    <div class="Homepage_Background"></div>

    <header class="Homepage_Header">
        <div class="Homepage_Directory">
            <h1 class="Homepage_Title"><?php echo $marketName; ?> Marketplace</h1>
            <input type="text" placeholder="Search...">
            <div class="flex">
                <a href="<?= BASE_URL ?>ProfilePage/Profile.php">
                    <span class="material-icons-outlined">account_circle</span>
                </a>

                <a href="<?= BASE_URL ?>NFTDetailsPage/NFTDetails.php">
                    <span class="material-icons-outlined">inventory_2</span>
                </a>
                <button onclick="connectWallet()" id="Wallet_Status">
                    <span class="material-symbols-outlined">
                        account_balance_wallet
                    </span>
                </button>
            </div>
        </div>

        <div class="Homepage_ShadeContainer">
            <?php
            // Dynamically repeat red/white pattern 6 times
            for ($i = 0; $i < 6; $i++) {
                echo '<div class="Homepage__ShadeThingie Red"></div>';
                echo '<div class="Homepage__ShadeThingie White"></div>';
            }
            ?>
        </div>
    </header>

    <div>
        <main style="padding: 2rem; display: flex; flex-direction: row; gap: 2rem;">

            <!-- Main Content -->
            <section class="nft-display-panel">
                <!-- Filter buttons -->
                <div class="nft-filters">
                    <!-- Sidebar -->
                    <aside class="category-panel">
                        <h3>Categories</h3>
                        <ul>
                            <button class="category" onclick="getTokenSpecificURI(1)" data-type="earth">Earth</button>
                            <button class="category" onclick="getTokenSpecificURI(1)" data-type="fire">Fire</button>
                            <button class="category" onclick="getTokenSpecificURI(1)" data-type="water">Water</button>
                            <button class="category" onclick="getTokenSpecificURI(1)" data-type="wind">Wind</button>
                            <button class="category" onclick="getTokenSpecificURI(1)" data-type="shadow">Shadow</button>
                            <button class="category" onclick="getTokenSpecificURI(1)" data-type="grass">Grass</button>
                            <button class="category" onclick="getTokenSpecificURI(1)" data-type="energy">Energy</button>
                        </ul>
                    </aside>
                </div>
                <!-- NFT Section -->
                <div class="nft-carousel">
                    <div class="nft-card"></div>
                </div>
            </section>
        </main>

        <section class="DisplayNFT">
            <h1>All NFT</h1>
            <section class="DisplayNFT__container">
            </section>
        </section>
    </div>

    <script src="/BegineerLuck_WebDev/public/SmartContract/SmartContract.js"></script>
    <script src="<?= BASE_URL ?>Homepage/index.js"></script>
</body>

</html>