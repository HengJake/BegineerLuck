require("dotenv").config();
const Web3 = require('web3');
// Connect to the blockchain using your RPC URL (Devnet or mainnet)
const web3 = new Web3("https://devnet.neonevm.org"); // Replace with your actual RPC URL

// Fetch private key and owner address from environment variables
const PRIVATE_KEY = "ac264e9c98433ee44904d7140a9a024986cc01e4adf1ba3eb8c32d4beb1d00b1";
const OWNER_ADDRESS = "0x8F7Bb4FEe6456da0601E7E034c82A25f528B6921";

// The smart contract ABI and address
const CONTRACT_ABI = [
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
const CONTRACT_ADDRESS = "0x7b27eA836fbD2a5e1568B4c5dC66A52f06639Ee4";

const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

// Function to call OwnerGiveSTKM
async function giveSTKM(toAddress, amount) {
  const amountWei = web3.utils.toWei(amount.toString(), "ether"); // Convert to wei

  const txData = contract.methods
    .OwnerGiveSTKM(toAddress, amountWei)
    .encodeABI();

  const tx = {
    from: OWNER_ADDRESS,
    to: CONTRACT_ADDRESS,
    data: txData,
    gas: 500000,
    gasPrice: await web3.eth.getGasPrice(),
    chainId: 245022926,
  };

  // Sign the transaction using the private key
  const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

  // Send the signed transaction to the blockchain
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log("Transaction successful:", receipt.transactionHash);
  return receipt;
}

// Example usage
async function main() {
  const toAddress = "0xf05451d9640ef0911cb5a19f2618b66462cde659"; // Replace with recipient address
  const amount = 1000; // Example amount to transfer in STKM

  try {
    const receipt = await giveSTKM(toAddress, amount);
    console.log("STKM successfully transferred:", receipt);
  } catch (error) {
    console.error("Error during transfer:", error);
  }
}

main();
