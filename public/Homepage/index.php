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
                <div class="STKM__AMT">
                    <p id="STKM">STKM</p>
                    <div class="BUY__STKM">
                        <input type="text" id="setNumberInput">
                        <span class="material-icons-outlined" id="BUY__STKM">
                            add
                        </span>
                    </div>
                </div>
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
                            <button class="category" onclick="getTokenSpecificURI(4)" data-type="electric">Electric</button>
                            <button class="category" onclick="getTokenSpecificURI(7)" data-type="energy">Energy</button>
                            <button class="category" onclick="getTokenSpecificURI(10)" data-type="fire">Fire</button>
                            <button class="category" onclick="getTokenSpecificURI(13)" data-type="grass">Grass</button>
                            <button class="category" onclick="getTokenSpecificURI(16)" data-type="shadow">Shadow</button>
                            <button class="category" onclick="getTokenSpecificURI(19)" data-type="water">Water</button>
                            <button class="category" onclick="getTokenSpecificURI(22)" data-type="wind">Wind</button>
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
            <h1>All NFT (Red : Owned By Other || Green : Owner by you || Yellow : No Owner)</h1>
            <section class="DisplayNFT__container">
            </section>
        </section>

        <section class="TradeNFT">
            <h1>Trade NFT</h1>
            <div id="playerContainer">

            </div>
            <div>
                <form id="tradeForm">
                    <label for="oAddress">Opponent Player address</label>
                    <input type="text" name="oAddress" id="oAddress" required>

                    <label for="yoursNFT">Your NFT ID</label>
                    <input type="number" name="yoursNFT" id="yoursNFT" required>

                    <label for="theirsNFT">Theirs NFT ID</label>
                    <input type="number" name="theirsNFT" id="theirsNFT" required>

                    <button type="submit">Start Trade</button>
                </form>
            </div>
            <hr class="mb-2 mt-2">
            <h1>Trade Request</h1>
            <div class="TradeRequest" id="TradeRequest">

            </div>
        </section>
    </div>
    <script src="/BegineerLuck_WebDev/public/SmartContract/SmartContract.js"></script>
    <script src="<?= BASE_URL ?>Homepage/index.js"></script>
</body>

</html>