<?php

// TODO: TEST CASE 1: Check if the image is displayed correctly
// view_image.php?id=123
// require 'db_connect.php';  // Your DB connection

// $id = 9;
// $stmt = $conn->prepare("SELECT profile_pic FROM users WHERE id = ?");
// $stmt->bind_param("i", $id);
// $stmt->execute();
// $stmt->store_result();

// if ($stmt->num_rows > 0) {
//     $stmt->bind_result($profile_pic);
//     $stmt->fetch();

//     header("Content-Type: image/jpeg");  // or image/png based on what you store
//     echo $profile_pic;
// } else {
//     http_response_code(404);
//     echo "Image not found.";
// }

?>
<!-- TODO: TEST CASE 2: Interaction with smart contract -->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Counter Contract - Neon EVM</title>
    <script src="https://cdn.jsdelivr.net/npm/web3@1.10.0/dist/web3.min.js"></script>
</head>

<body>
    <h1>Neon EVM Counter Contract</h1>

    <button onclick="connectWallet()">🔗 Connect Wallet</button><br><br>

    <h3>1. Set Number</h3>
    <input type="number" id="setNumberInput" placeholder="Enter new number" />
    <button onclick="setNumber()">Set Number</button><br><br>

    <h3>2. Increment</h3>
    <button onclick="increment()">➕ Increment</button><br><br>

    <h3>3. Set Password</h3>
    <input type="text" id="passwordInput" placeholder="Enter password" />
    <button onclick="setPassword()">Set Password</button><br><br>

    <h3>4. Read Values</h3>
    <button onclick="readNumber()">Read Number</button>
    <button onclick="readPassword()">Read Password</button>
    <p id="output"></p>

    <script>
        let web3;
        let contract;

        const contractAddress = "0x5Ce078Aa97140aCe6939E4882822e21fB7D00604";
        const contractABI = [{
            "inputs": [],
            "name": "increment",
            "outputs": [{
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [],
            "name": "number",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "password",
            "outputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "uint256",
                "name": "newNumber",
                "type": "uint256"
            }],
            "name": "setNumber",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "string",
                "name": "_password",
                "type": "string"
            }],
            "name": "setPassword",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }];

        async function connectWallet() {
            if (window.ethereum) {
                web3 = new Web3(window.ethereum);
                try {
                    await window.ethereum.request({
                        method: "eth_requestAccounts"
                    });
                    contract = new web3.eth.Contract(contractABI, contractAddress);
                    alert("🔗 Wallet connected!");
                } catch (error) {
                    alert("❌ Connection rejected");
                }
            } else {
                alert("🦊 Please install MetaMask");
            }
        }

        async function setNumber() {
            const newNumber = document.getElementById("setNumberInput").value;
            const accounts = await web3.eth.getAccounts();
            await contract.methods.setNumber(newNumber).send({
                from: accounts[0]
            });
            alert("✅ Number set!");
        }

        async function increment() {
            const accounts = await web3.eth.getAccounts();
            const result = await contract.methods.increment().send({
                from: accounts[0]
            });
            alert("✅ Incremented! Check read number.");
        }

        async function setPassword() {
            const password = document.getElementById("passwordInput").value;
            const accounts = await web3.eth.getAccounts();
            await contract.methods.setPassword(password).send({
                from: accounts[0],
                value: web3.utils.toWei("0", "ether") // send 0 ETH, or change if needed
            });
            alert("🔐 Password set!");
        }

        async function readNumber() {
            const value = await contract.methods.number().call();
            document.getElementById("output").innerText = "📊 Number: " + value;
        }

        async function readPassword() {
            const value = await contract.methods.password().call();
            document.getElementById("output").innerText = "🔐 Password: " + value;
        }
    </script>
</body>

</html>