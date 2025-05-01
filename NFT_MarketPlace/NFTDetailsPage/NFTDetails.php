<?php
include $_SERVER['DOCUMENT_ROOT'] . '/BegineerLuck_WebDev/NFT_MarketPlace/db_connect.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/BegineerLuck_WebDev/NFT_MarketPlace/general.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
    <title>View Inventory</title>
</head>

<body class="Details_Body">
    <main>
        <button class="Details_Button back">
            <span class="material-icons-outlined">chevron_left</span>
        </button>
        <button class="Details_Button foward">
            <span class="material-icons-outlined">navigate_next</span>
        </button>

        <div class="Details_BookPage">
            <h1>[player]'s NFT Collection</h1>
        </div>
        <div class="Details_BookPage">
            <h1>NFT Details</h1>
        </div>
    </main>

    <script src="NFTDetails.js"></script>
</body>
</html>
