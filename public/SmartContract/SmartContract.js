let web3;
let contract;

// auto connect wallet
window.addEventListener("load", async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        console.log("🔗 Already connected:", accounts[0]);
        WalletStatus.style.backgroundColor = "green";
        document.cookie = `WalletAddress=${accounts[0]}; path=/; SameSite=Lax`;

        // ✅ INIT WEB3 + CONTRACT
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(contractABI, contractAddress);

        // ✅ CALL getTokenURI AFTER CONTRACT INIT
        getTokenURI();
      } else {
        console.log("🔌 MetaMask not connected yet");
        WalletStatus.style.backgroundColor = "red";
      }

      // Listen for account changes
      ethereum.on("accountsChanged", (acc) => {
        if (acc.length > 0) {
          document.cookie = `WalletAddress=${acc[0]}; path=/; SameSite=Lax`;
          location.reload(); // Refresh to reinit contract + fetch data
        } else {
          document.cookie =
            "WalletAddress=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
      });
    } catch (err) {
      console.error("❌ Wallet check failed:", err);
      WalletStatus.style.backgroundColor = "red";
    }
  } else {
    alert("⚠️ Please install MetaMask!");
  }
});

const contractAddress = "0xC0768B537DB2401Cdbf1bCF5e7AB55c2019d41Fb";
const contractABI = 
  [
    {
      inputs: [
        { internalType: "contract ISTKM", name: "_STKM", type: "address" },
        { internalType: "contract INFT", name: "_NFT", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    { inputs: [], name: "Game__MustMoreThanNFTPrice", type: "error" },
    { inputs: [], name: "Game__NFTPaymentFailed", type: "error" },
    { inputs: [], name: "Game__NoSTKMBought", type: "error" },
    { inputs: [], name: "Game__OnlyNeon", type: "error" },
    { inputs: [], name: "Game__TransactionFailed", type: "error" },
    { stateMutability: "payable", type: "fallback" },
    {
      inputs: [
        { internalType: "uint256", name: "tradeId", type: "uint256" },
        { internalType: "uint256", name: "yourToken", type: "uint256" },
      ],
      name: "AcceptTrade",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
      name: "BuyNFT",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
      name: "BuyResellNFT",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "CheckRewardsLatestUpdateTime",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MintAccruedRewards",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
      name: "NFTOwnerOf",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "NFT_PRICE",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_to", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
      ],
      name: "OwnerGiveSTKM",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "tradeId", type: "uint256" },
        { internalType: "uint256", name: "yourToken", type: "uint256" },
      ],
      name: "RejectTrade",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_tokenId", type: "uint256" },
        { internalType: "uint256", name: "ResellPrice", type: "uint256" },
      ],
      name: "ResellNFT",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
      name: "RevokeResellNFT",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "STKMBalanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "STKMDecimals",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_opponent", type: "address" },
        { internalType: "uint256", name: "_yourTokenId", type: "uint256" },
        { internalType: "uint256", name: "_opponentTokenId", type: "uint256" },
      ],
      name: "StartTrade",
      outputs: [{ internalType: "uint256", name: "tradeId", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "buySTKM",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "checkOwner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getBaseURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
      name: "getCurrentResellNFT",
      outputs: [
        {
          components: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "buyer", type: "address" },
            { internalType: "uint256", name: "sellingPrice", type: "uint256" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "uint256", name: "timeListed", type: "uint256" },
            { internalType: "uint256", name: "timeSold", type: "uint256" },
          ],
          internalType: "struct INFT.reSell",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getNFTOriginalPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_resellId", type: "uint256" }],
      name: "getPastReSellHistory",
      outputs: [
        {
          components: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "buyer", type: "address" },
            { internalType: "uint256", name: "sellingPrice", type: "uint256" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "uint256", name: "timeListed", type: "uint256" },
            { internalType: "uint256", name: "timeSold", type: "uint256" },
          ],
          internalType: "struct INFT.reSell",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_tradeId", type: "uint256" }],
      name: "getPastTradeHistory",
      outputs: [
        {
          components: [
            { internalType: "address", name: "_ownerA", type: "address" },
            { internalType: "address", name: "_ownerB", type: "address" },
            { internalType: "uint256", name: "_tokenIdA", type: "uint256" },
            { internalType: "uint256", name: "_tokenIdB", type: "uint256" },
            { internalType: "bool", name: "_approvedA", type: "bool" },
            { internalType: "bool", name: "_approvedB", type: "bool" },
          ],
          internalType: "struct INFT.Trade",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
      name: "getTokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
      name: "withdrawSTKM",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ];

const WalletStatus = document.getElementById("Wallet_Status");

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      contract = new web3.eth.Contract(contractABI, contractAddress);
      alert("🔗 Wallet connected!");
      WalletStatus.style.backgroundColor = "green";
    } catch (error) {
      alert("❌ Connection rejected");
      WalletStatus.style.backgroundColor = "red";
    }
  } else {
    alert("🦊 Please install MetaMask");
    WalletStatus.style.backgroundColor = "red";
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
      value: weiValue,
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
    for (i = 1; i <= 23; i+=3) {
      // set it to responsive
      const tokenURI = await contract.methods.getTokenURI(i).call();
      console.log("Token URI:", tokenURI);
      readIPFSMetadata(tokenURI, 0); // Call the function to read metadata
    }
  } catch (error) {
    console.error("❌ Failed to get Token URI:", error);
    alert("Please connect to metamask wallet");
  }
}

async function getTokenSpecificURI(id) {
  try {
    const tokenURI = await contract.methods.getTokenURI(id).call();
    console.log("Single Token URI:", tokenURI);
    readIPFSMetadata(tokenURI, 1);
  } catch (error) {
    console.error("❌ Failed to get Token URI:", error);
    alert("Please connect to metamask wallet");
  }
}

// display metadata from IPFS
async function readIPFSMetadata(ipfsURI, action) {
  const httpURL = ipfsURI.replace("ipfs://", "https://ipfs.io/ipfs/");

  try {
    const response = await fetch(httpURL);
    const metadata = await response.json();
    console.log("Metadata:", metadata);
    if (action == 0) {
        displayNFT(metadata);
    } else if (action == 1) {
      displaySingleNFT(metadata);
    }
  } catch (error) {
    console.error("❌ Failed to fetch metadata:", error);
    alert("❌ Could not load metadata. Check console for details.");
  }
}

function displaySingleNFT(metadata) {
  const imageUrl = metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/");
  const container = document.querySelector(".nft-card");
  container.innerHTML = ""; // clear previous content

  // Main flex wrapper
  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.gap = "20px";

  // Image container
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = metadata.name || "NFT";

  // Info container
  const info = document.createElement("div");

  const name = document.createElement("h2");
  name.textContent = metadata.name;
  name.style.margin = "0 0 10px";

  const description = document.createElement("p");
  description.textContent = metadata.description;
  description.style.margin = "0";

  info.appendChild(name);
  info.appendChild(description);

  wrapper.appendChild(img);
  wrapper.appendChild(info);
  container.appendChild(wrapper);
}

// add nft into homepage
function displayNFT(metadata, tokenId) {
  const container = document.querySelector(".DisplayNFT__container");

  const card = document.createElement("div");
  card.className = "DisplayNFT__container__NFT";

  const img = document.createElement("img");
  img.src = metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/");
  img.alt = metadata.name;
  img.style.width = "200px";
  img.style.borderRadius = "10px";

  const name = document.createElement("h3");
  name.textContent = metadata.name;

  const desc = document.createElement("p");
  desc.textContent = metadata.description;

  const attrList = document.createElement("ul");
  metadata.attributes?.forEach((attr) => {
    const li = document.createElement("li");
    li.textContent = `${attr.trait_type}: ${attr.value}`;
    attrList.appendChild(li);
  });

  // ✅ Buy button
  const buyButton = document.createElement("button");
  buyButton.textContent = "Buy NFT";
  buyButton.onclick = () => buyNFT(tokenId); // attach click handler

  // Append elements
  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(desc);
  card.appendChild(attrList);
  card.appendChild(buyButton);

  container.appendChild(card);
}

async function buyNFT(nftID) {
  try {
    const accounts = await web3.eth.getAccounts(); // get connected wallet

    // Send transaction to buyNFT
    const receipt = await contract.methods.BuyNFT(nftID).send({
      from: accounts[0],
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
    const owner = await contract.methods.NFTOwnerOf(nftID).call();

    console.log(owner);
  } catch (error) {
    console.error("❌ Transaction failed:", error);
    alert("❌ Display of owner failed. See console for details.");
  }
}

async function stickAmnt() {
  try {
  } catch (error) {
    console.error("❌ Transaction failed:", error);
    alert("❌ Display of owner failed. See console for details.");
  }
}

console.log("Smart Contract connected");
