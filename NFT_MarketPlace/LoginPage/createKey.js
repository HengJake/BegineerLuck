const { Keypair } = require('@solana/web3.js');

// Create wallet
const wallet = Keypair.generate();

// Extract keys
const publicKey = wallet.publicKey.toBase58();
const secretKey = wallet.secretKey;

console.log("Public Key:", publicKey);
console.log("Secret Key:", Array.from(secretKey)); // For demo only, avoid logging in production

// Return to frontend or session (e.g., in API)
const result = {
  "publicKey": publicKey,
  secretKey: Array.from(secretKey), // Ideally encrypted or stored securely if needed
};

module.exports = result;
