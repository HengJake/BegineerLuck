<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Counter Contract - Neon EVM</title>
  <script src="https://cdn.jsdelivr.net/npm/web3@1.10.0/dist/web3.min.js"></script>
  <?php include_once __DIR__ . '/../headLinks.php'; ?>
</head>

<body>
  <h1>Neon EVM Counter Contract</h1>

  <button onclick="connectWallet()">🔗 Connect Wallet</button> <span class="material-icons-outlined" id="Wallet_Status" style="color:red;">clear</span> <br><br>

  <h3>1. Purchase STKM</h3>
  <input type="number" id="setNumberInput" min=0 placeholder="Enter new number" />
  <button onclick="buySTKM()">Buy</button><br><br>

  <button onclick="getBaseURI()">Get Base URI</button><br><br>

  <button onclick="getTokenURI(1)">Get Token URI</button><br><br>

  <button onclick="buyNFT(1)">Buy NFT 1</button>

  <button onclick="ownerOf(1)">Owner of NFT 1</button>

  <h1>NFT BELOW ME!!</h1>
  <div id="NFT_Container"></div>
</body>
<script src="SmartContract.js"></script>

</html>