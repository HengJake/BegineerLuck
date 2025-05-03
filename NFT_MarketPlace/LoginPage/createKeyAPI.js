const express = require('express');
const { Keypair } = require('@solana/web3.js');
const cors = require('cors');

const app = express();
const PORT = 8082;

app.use(cors()); // Allow requests from your PHP site

app.get('/create-key', (req, res) => {
    const wallet = Keypair.generate();
    const publicKey = wallet.publicKey.toBase58();
    const secretKey = Array.from(wallet.secretKey); // Only send if needed

    res.json({
        publicKey,
        secretKey, // Be careful in production!
    });
});

app.listen(PORT, () => {
    console.log(`Wallet API running on http://localhost:${PORT}`);
});