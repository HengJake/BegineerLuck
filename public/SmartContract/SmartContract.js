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
        userAddress = accounts[0];
        WalletStatus.style.backgroundColor = "green";
        document.cookie = `WalletAddress=${accounts[0]}; path=/; SameSite=Lax`;

        // ✅ INIT WEB3 + CONTRACT
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(contractABI, contractAddress);

        // ✅ CALL getTokenURI AFTER CONTRACT INIT
        getTokenURI();
        let stkmAmt = await getSTKMBalance();
        document.getElementById("STKM").innerHTML =
          "STKM : " + Math.round(stkmAmt);

        // Init see if got trade or not
        // document.getElementById("TradeRequest").innerHTML = getPastTradeHistory()
      } else {
        console.log("🔌 MetaMask not connected yet");
        WalletStatus.style.backgroundColor = "red";
      }

      // Listen for account changes
      ethereum.on("accountsChanged", (acc) => {
        if (acc.length > 0) {
          document.cookie = `WalletAddress=${acc[0]}; path=/; SameSite=Lax`;
          userAddress = accounts[0];
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

const contractAddress = "0x7b27eA836fbD2a5e1568B4c5dC66A52f06639Ee4";
const contractABI = [
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

// async function buySTKM() {
//   try {
//     const ethAmount = document.getElementById("setNumberInput").value; // input in ETH
//     const accounts = await web3.eth.getAccounts(); // get connected wallet

//     const weiValue = web3.utils.toWei(ethAmount, "ether"); // convert ETH to wei

//     // Send transaction to buySTKM
//     const receipt = await contract.methods.buySTKM().send({
//       from: accounts[0],
//       value: weiValue,
//     });

//     console.log("Transaction receipt:", receipt);
//     alert("✅ You have successfully purchased STKM!");
//   } catch (error) {
//     console.error("❌ Transaction failed:", error);
//     alert("❌ Purchase failed. See console for details.");
//   }
// }

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
    for (i = 1; i <= 23; i += 3) {
      // set it to responsive
      const tokenURI = await contract.methods.getTokenURI(i).call();
      // console.log("Token URI:", tokenURI);
      readIPFSMetadata(tokenURI, 0, i); // Call the function to read metadata
    }
  } catch (error) {
    console.error("❌ Failed to get Token URI:", error);
    alert("Please connect to metamask wallet");
  }
}

async function getTokenSpecificURI(
  id,
  displayInAll = false,
  hasRecurred = false
) {
  try {
    const tokenURI = await contract.methods.getTokenURI(id).call();
    // console.log("Single Token URI:", tokenURI, "ID : ", id);

    if (!displayInAll) {
      readIPFSMetadata(tokenURI, 1, id);
    } else {
      readIPFSMetadata(tokenURI, 0, id, hasRecurred);
    }
  } catch (error) {
    console.error("❌ Failed to get Token URI:", error);
    alert("Please connect to metamask wallet");
  }
}

// display metadata from IPFS
async function readIPFSMetadata(ipfsURI, action, id, hasRecurred = false) {
  const httpURL = ipfsURI.replace("ipfs://", "https://ipfs.io/ipfs/");

  try {
    const response = await fetch(httpURL);
    const metadata = await response.json();
    let ownerofNFT = await getNFTOwner(id);

    // console.log("Metadata:", metadata);

    // user own the NFT
    if (
      ownerofNFT.toLowerCase() === userAddress.toLowerCase() &&
      !hasRecurred
    ) {
      console.log(id, "Is da owner");
      getTokenSpecificURI(id + 1, true, true);
      return; // stop here, don't run display code
    }

    // user doesnt own the nft
    if (action == 0) {
      displayNFT(metadata, id);
    } else if (action == 1) {
      displaySingleNFT(metadata, id);
    }
  } catch (error) {
    console.error("❌ Failed to fetch metadata:", error);
    alert("❌ Could not load metadata. Check console for details.");
  }
}

function displaySingleNFT(metadata, id) {
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

  const buyButton = document.createElement("button");
  buyButton.textContent = "Buy NFT";
  buyButton.onclick = () => buyNFT(id);

  const getOwner = document.createElement("button");
  getOwner.textContent = "Get Owner";
  getOwner.onclick = () => getNFTOwner(id);

  info.appendChild(name);
  info.appendChild(description);

  wrapper.appendChild(buyButton);
  wrapper.appendChild(getOwner);
  wrapper.appendChild(img);
  wrapper.appendChild(info);
  container.appendChild(wrapper);
}

// add nft into homepage
function displayNFT(metadata, id) {
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
  buyButton.onclick = () => buyNFT(id); // attach click handler

  const checkButton = document.createElement("button");
  checkButton.textContent = "Check NFT Price";
  checkButton.onclick = () => getNFTOriginalPrice(); // attach click handler

  const getOwner = document.createElement("button");
  getOwner.textContent = "Get Owner";
  getOwner.onclick = () => getNFTOwner(id);

  // Append elements
  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(desc);
  card.appendChild(attrList);
  card.appendChild(buyButton);
  card.appendChild(checkButton);
  card.appendChild(getOwner);

  container.appendChild(card);
}

/**
 * @description connect wallet
 * @returns connected user address
 */
async function initWeb3() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    userAddress = accounts[0];
    contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    return userAddress;
  } else {
    throw new Error("MetaMask not found");
  }
}

/**
 * @description user buy STKM using their NEON token, and the purchase is in equivalent values
 * @param {Number} amountInEther amount of NEON token to purchase STKM
 *
 */
async function buySTKM(amountInEther) {
  const valueWei = web3.utils.toWei(amountInEther.toString(), "ether");
  return await contract.methods.buySTKM().send({
    from: userAddress,
    value: valueWei,
  });
}

/**
 * @description user withdraw their existing STKM in exchange to NEON
 * @param {Number} amountInEther amount of STKM token to be withdrawn
 *
 */
async function withdrawSTKM(amountInEther) {
  const amountWei = web3.utils.toWei(amountInEther.toString(), "ether");
  return await contract.methods.withdrawSTKM(amountWei).send({
    from: userAddress,
  });
}

/**
 * @description this is used to mint daily rewards
 *
 */
async function mintRewards() {
  return await contract.methods.MintAccruedRewards().send({
    from: userAddress,
  });
}

/**
 * @description checks user STKM balance, including the accrued rewards, but the accrueds rewards are not minted
 *
 * (buySTKM, transfers and withdrawal process will also carry out the accrued mint, therefore ``mintRewards`` is very optional)
 *
 * @returns user STKM balance (18 decimals is included)
 *
 */
async function getSTKMBalance() {
  const result = await contract.methods
    .STKMBalanceOf()
    .call({ from: userAddress });
  return web3.utils.fromWei(result, "ether");
}

/**
 * @description return the lastest time the daily rewards were minted
 * @returns blockchain timestamp (unix time)
 *
 */
async function getLastRewardUpdateTime() {
  const timestamp = await contract.methods
    .CheckRewardsLatestUpdateTime()
    .call({ from: userAddress });
  return parseInt(timestamp);
}

/**
 * @description user buy NFT, if user balance is below 500 STKM, the transaction will revert
 * @param {Number} tokenId to buy
 *
 */
async function buyNFT(tokenId) {
  return await contract.methods.BuyNFT(tokenId).send({
    from: userAddress,
  });
}

/**
 * @description user resell their NFT
 * @param {Number} tokenId to resell
 * @param {Number} resellPrice resell price
 *
 */
async function resellNFT(tokenId, resellPrice) {
  return await contract.methods.ResellNFT(tokenId, resellPrice).send({
    from: userAddress,
  });
}

/**
 * @description user who initialized the resell revoke (close) the resell
 * @param {Number} tokenId to be revoked
 *
 */
async function revokeResellNFT(tokenId) {
  return await contract.methods.RevokeResellNFT(tokenId).send({
    from: userAddress,
  });
}

/**
 * @description user B buy the resell NFT
 * @param {Number} tokenId to buy
 *
 */
async function buyResellNFT(tokenId) {
  return await contract.methods.BuyResellNFT(tokenId).send({
    from: userAddress,
  });
}

/**
 * @description User A start trade with User B
 * @param {String} opponentAddress user B address
 * @param {Number} yourTokenId user A NFT id
 * @param {Number} opponentTokenId user B nft id
 * @returns trade id, needed for user B to accept/reject
 *
 */
async function startTrade(opponentAddress, yourTokenId, opponentTokenId) {
  return await contract.methods
    .StartTrade(opponentAddress, yourTokenId, opponentTokenId)
    .send({
      from: userAddress,
    });
}

// initiate trade
document
  .getElementById("tradeForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent the page from reloading

    const opponentAddress = document.getElementById("oAddress").value.trim();
    const yourTokenId = parseInt(document.getElementById("yoursNFT").value);
    const opponentTokenId = parseInt(
      document.getElementById("theirsNFT").value
    );

    try {
      const receipt = await startTrade(
        opponentAddress,
        yourTokenId,
        opponentTokenId
      );
      console.log("✅ Trade started:", receipt);
      alert("✅ Trade initiated successfully!");
    } catch (error) {
      console.error("❌ Failed to start trade:", error);
      alert("❌ Trade failed. Check console for details.");
    }
  });

/**
 * @description User B accept the trade
 * @param {Number} tradeId generated by ``startTrade``
 * @param {Number} yourToken user B NFT id
 *
 */
async function acceptTrade(tradeId, yourToken) {
  return await contract.methods.AcceptTrade(tradeId, yourToken).send({
    from: userAddress,
  });
}

/**
 * @description User B reject the trade
 * @param {*} tradeId generated by ``startTrade``
 * @param {*} yourToken user B NFT id
 *
 */
async function rejectTrade(tradeId, yourToken) {
  return await contract.methods.RejectTrade(tradeId, yourToken).send({
    from: userAddress,
  });
}

/**
 * @description check the current owner of the NFT
 * @param {Number} tokenId
 * @returns current owner of this NFT
 *
 */
async function getNFTOwner(tokenId) {
  const owner = await contract.methods.NFTOwnerOf(tokenId).call();
  console.log("Owner : ", owner, "of NFT : ", tokenId)
  return owner;
}

/**
 * @description check the current resell NFT
 * @param {Number} tokenId
 * @returns the information of the current resell NFT (has yet to be sold/revoked)
 *
 */
async function getCurrentResellNFT(tokenId) {
  const resellInfo = await contract.methods.getCurrentResellNFT(tokenId).call();
  console.log("Current Resell NFT:", resellInfo);
  return resellInfo;
}

/**
 * @description check the past resell history information
 * @param {Number} resellId
 * @returns the information of the past resell NFT (in history - sold)
 *
 */
async function getPastReSellHistory(resellId) {
  const resellHistory = await contract.methods
    .getPastReSellHistory(resellId)
    .call();
  console.log("Past Resell History:", resellHistory);
  return resellHistory;
}

/**
 * @description check the past trade history
 * @param {Number} tradeId
 * @returns the information of the past trade history
 *
 */
async function getPastTradeHistory(tradeId) {
  const tradeHistory = await contract.methods
    .getPastTradeHistory(tradeId)
    .call();
  console.log("Past Trade History:", tradeHistory);
  return tradeHistory;
}

/**
 * @description get the base URI
 * @returns the base URI (metadata folder)
 *
 */
// async function getBaseURI() {
//   const baseURI = await contract.methods.getBaseURI().call();
//   console.log("Base URI:", baseURI);
//   return baseURI;
// }

/**
 * @description get the token URI
 * @param {Number} tokenId NFT id
 * @returns tokenURI (metadata for specific NFT)
 */
// async function getTokenURI(tokenId) {
//   const tokenURI = await contract.methods.getTokenURI(tokenId).call();
//   console.log("Token URI:", tokenURI);
//   return tokenURI;
// }

/**
 * @description get the NFT original price (selling price, not resell price)
 * @returns the NFT price
 *
 */
async function getNFTOriginalPrice() {
  const price = await contract.methods.getNFTOriginalPrice().call();
  console.log("NFT Original Price:", price);
  return price;
}




console.log("Smart Contract connected");
