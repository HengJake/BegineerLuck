let web3;
let contract;

const contractAddress = "0xa534A0c5080535EaE0Dc5959fb6e1DDA44905E0f";
const contractABI = [{ "inputs": [{ "internalType": "contract ISTKM", "name": "_STKM", "type": "address" }, { "internalType": "contract INFT", "name": "_NFT", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "Game__MustMoreThanNFTPrice", "type": "error" }, { "inputs": [], "name": "Game__NFTPaymentFailed", "type": "error" }, { "inputs": [], "name": "Game__NoSTKMBought", "type": "error" }, { "inputs": [], "name": "Game__OnlyNeon", "type": "error" }, { "inputs": [], "name": "Game__TransactionFailed", "type": "error" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [{ "internalType": "uint256", "name": "tradeId", "type": "uint256" }, { "internalType": "uint256", "name": "yourToken", "type": "uint256" }], "name": "AcceptTrade", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "BuyNFT", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "BuyResellNFT", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "CheckRewardsLatestUpdateTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MintAccruedRewards", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "NFTOwnerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "NFT_PRICE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "OwnerGiveSTKM", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tradeId", "type": "uint256" }, { "internalType": "uint256", "name": "yourToken", "type": "uint256" }], "name": "RejectTrade", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "ResellPrice", "type": "uint256" }], "name": "ResellNFT", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "RevokeResellNFT", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "STKMBalanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "STKMDecimals", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_opponent", "type": "address" }, { "internalType": "uint256", "name": "_yourTokenId", "type": "uint256" }, { "internalType": "uint256", "name": "_opponentTokenId", "type": "uint256" }], "name": "StartTrade", "outputs": [{ "internalType": "uint256", "name": "tradeId", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "buySTKM", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "checkOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getBaseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "getCurrentResellNFT", "outputs": [{ "components": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "buyer", "type": "address" }, { "internalType": "uint256", "name": "sellingPrice", "type": "uint256" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "timeListed", "type": "uint256" }, { "internalType": "uint256", "name": "timeSold", "type": "uint256" }], "internalType": "struct INFT.reSell", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_resellId", "type": "uint256" }], "name": "getPastReSellHistory", "outputs": [{ "components": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "buyer", "type": "address" }, { "internalType": "uint256", "name": "sellingPrice", "type": "uint256" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "timeListed", "type": "uint256" }, { "internalType": "uint256", "name": "timeSold", "type": "uint256" }], "internalType": "struct INFT.reSell", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tradeId", "type": "uint256" }], "name": "getPastTradeHistory", "outputs": [{ "components": [{ "internalType": "address", "name": "_ownerA", "type": "address" }, { "internalType": "address", "name": "_ownerB", "type": "address" }, { "internalType": "uint256", "name": "_tokenIdA", "type": "uint256" }, { "internalType": "uint256", "name": "_tokenIdB", "type": "uint256" }, { "internalType": "bool", "name": "_approvedA", "type": "bool" }, { "internalType": "bool", "name": "_approvedB", "type": "bool" }], "internalType": "struct INFT.Trade", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "getTokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdrawSTKM", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
const WalletStatus = document.getElementById("Wallet_Status");

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            contract = new web3.eth.Contract(contractABI, contractAddress);
            alert("🔗 Wallet connected!");
            WalletStatus.innerHTML = "check_circle";
        } catch (error) {
            alert("❌ Connection rejected");
            WalletStatus.innerHTML = "clear";
        }
    } else {
        alert("🦊 Please install MetaMask");
        WalletStatus.innerHTML = "clear";
    }
}

async function buySTKM() {
    try {
        const ethAmount = document.getElementById("setNumberInput").value; // input in ETH
        const accounts = await web3.eth.getAccounts(); // get connected wallet

        const weiValue = web3.utils.toWei(ethAmount, "ether"); // convert ETH to wei

        // Send transaction to buySTKM
        const receipt = await contract.methods.buySTKM().send({
            from: accounts[0],
            value: weiValue
        });

        console.log("Transaction receipt:", receipt);
        alert("✅ You have successfully purchased STKM!");
    } catch (error) {
        console.error("❌ Transaction failed:", error);
        alert("❌ Purchase failed. See console for details.");
    }
}

async function getBaseURI() {
    try {
        const baseURI = await contract.methods.getBaseURI().call();
        console.log("Base URI:", baseURI);
        alert("Base URI: " + baseURI);
    } catch (error) {
        console.error("❌ Failed to get Base URI:", error);
        alert("❌ Failed to get Base URI. See console for details.");
    }
}

// read the NFT and get metadata from IPFS
async function getTokenURI() {
    try {
        const tokenURI = await contract.methods.getTokenURI(1).call();
        console.log("Token URI:", tokenURI);
        alert("Token URI: " + tokenURI);
        readIPFSMetadata(tokenURI); // Call the function to read metadata
    } catch (error) {
        console.error("❌ Failed to get Token URI:", error);
        alert("❌ Failed to get Token URI. See console for details.");
    }
}

// display metadata from IPFS
async function readIPFSMetadata(ipfsURI) {
    const httpURL = ipfsURI.replace("ipfs://", "https://ipfs.io/ipfs/");

    try {
        const response = await fetch(httpURL);
        const metadata = await response.json();

        console.log("Metadata:", metadata);

        // Get the container
        const container = document.getElementById("NFT_Container");
        container.innerHTML = ""; // Clear previous content if any

        // Create image element
        const img = document.createElement("img");
        img.src = metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/");
        img.alt = metadata.name;
        img.style.width = "300px";
        img.style.borderRadius = "15px";

        // Create name and description elements
        const name = document.createElement("h2");
        name.textContent = metadata.name;

        const desc = document.createElement("p");
        desc.textContent = metadata.description;

        // Create a list of attributes
        const attrList = document.createElement("ul");
        metadata.attributes?.forEach(attr => {
            const li = document.createElement("li");
            li.textContent = `${attr.trait_type}: ${attr.value}`;
            attrList.appendChild(li);
        });

        // Append everything to container
        container.appendChild(name);
        container.appendChild(img);
        container.appendChild(desc);
        container.appendChild(attrList);

    } catch (error) {
        console.error("❌ Failed to fetch metadata:", error);
        alert("❌ Could not load metadata. Check console for details.");
    }
}

async function buyNFT(nftID) {
    try {
        const accounts = await web3.eth.getAccounts(); // get connected wallet

        // Send transaction to buyNFT
        const receipt = await contract.methods.BuyNFT(nftID).send({
            from: accounts[0]
        });

        console.log("Transaction receipt:", receipt);
        alert("✅ You have successfully purchased the NFT!");
    } catch (error) {
        console.error("❌ Transaction failed:", error);
        alert("❌ Purchase failed. See console for details.");
    }
}

async function ownerOf(nftID) {
    try {
        const owner = await contract.methods.ownerOf(nftID).call();

        console.log(owner);

    } catch (error) {
        console.error("❌ Transaction failed:", error);
        alert("❌ Display of owner failed. See console for details.");
    }
}