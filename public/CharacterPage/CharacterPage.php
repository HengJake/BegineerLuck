<?php
// Define path to NFT image folder
$imageFolder = '../StickmanNFT/';
$localImageFolder = __DIR__ . '/../StickmanNFT/';

// Whitelist of allowed unlocked images
$allowedImages = [
    'fire_unlocked2.jpg',
    'water_unlocked2.jpg',
    'grass_unlocked2.jpg',
    'earth_unlocked2.jpg',
    'energy_unlocked2.jpg'
];

// Sanitize and get the image name from query
$image = basename($_GET['img'] ?? '');

// Character info map
$characterInfo = [
    'fire_unlocked2.jpg' => ['name' => 'Blaze Dragon', 'element' => 'Fire', 'rarity' => 'Epic'],
    'water_unlocked2.jpg' => ['name' => 'Steam Spirit', 'element' => 'Water', 'rarity' => 'Rare'],
    'grass_unlocked2.jpg' => ['name' => 'Leaf Guardian', 'element' => 'Grass', 'rarity' => 'Common'],
    'earth_unlocked2.jpg' => ['name' => 'Rock Warrior', 'element' => 'Earth', 'rarity' => 'Rare'],
    'energy_unlocked2.jpg' => ['name' => 'Energy Sprite', 'element' => 'Energy', 'rarity' => 'Legendary']
];

// Check access permission
if (!in_array($image, $allowedImages)) {
    http_response_code(403);
    echo "<h1>Access Denied</h1><p>This character is locked or does not exist.</p>";
    exit;
}

$imageSrc = $imageFolder . $image;
$info = $characterInfo[$image] ?? ['name' => 'Unknown', 'element' => 'Unknown', 'rarity' => 'Unknown'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= htmlspecialchars($info['name']) ?> - Character Page</title>
    <link rel="stylesheet" href="/BegineerLuck_WebDev/public/general.css">
    <script src="CharacterPage.js" defer></script>

    <style>
        body {
            margin: 0;
            padding: 2rem;
            background: linear-gradient(to bottom, #fceabb, #f8b500);
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .character-container {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            width: 100%;
            max-width: 500px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            text-align: center;
            position: relative;
            animation: fadeIn 0.5s ease;
        }

        .character-image {
            width: 250px;
            height: 250px;
            object-fit: contain;
            margin-bottom: 1rem;
            border-radius: 8px;
        }

        .character-name {
            font-size: 2rem;
            font-weight: bold;
            color: #e63946;
        }

        .character-details {
            font-size: 1rem;
            margin-top: 1rem;
            color: #444;
        }

        .character-details p {
            margin: 0.25rem 0;
        }

        .back-btn {
            margin-top: 2rem;
            padding: 0.6rem 1.2rem;
            background: #283618;
            color: white;
            border: none;
            border-radius: 6px;
            text-decoration: none;
            font-weight: bold;
            transition: background 0.3s ease, transform 0.2s ease;
        }

        .back-btn:hover {
            background: #3e4e2c;
            transform: scale(1.05);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body>

<div class="character-container" id="characterPage">
    <img src="<?= htmlspecialchars($imageSrc) ?>" alt="Character: <?= htmlspecialchars($info['name']) ?>" class="character-image">
    <div class="character-name"><?= htmlspecialchars($info['name']) ?></div>
    <div class="character-details">
        <p><strong>Element:</strong> <?= htmlspecialchars($info['element']) ?></p>
        <p><strong>Rarity:</strong> <?= htmlspecialchars($info['rarity']) ?></p>
        <p><em>More abilities, traits, and backstory coming soon...</em></p>
    </div>
    <a href="/BegineerLuck_WebDev/public/index.php" class="back-btn">← Back to Marketplace</a>
</div>

</body>
</html>
