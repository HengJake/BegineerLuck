document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("testButton").addEventListener("click", async function test() {
        const shouldCreateWallet = confirm("You didn't enter a wallet address. Do you want us to create one for you?");
        if (shouldCreateWallet) {
            try {
                const response = await fetch('http://localhost:8082/create-key'); // This should be an API route, not a .js file
                const data = await response.json();

                if (data.publicKey) {
                    // Assuming formData is accessible here or passed in
                    // formData.set('wallet_address', data.publicKey);
                    alert("Wallet created: " + data.publicKey);
                } else {
                    alert("Failed to create wallet.");
                }
            } catch (err) {
                console.error("Wallet creation failed:", err);
            }
        }
    });

    document.getElementById('signupForm').addEventListener('submit', async function (e) {
        e.preventDefault(); // Stop default submission

        const form = e.target;
        const formData = new FormData(form);

        const walletAddress = formData.get('wallet_address');

        // Check if wallet is entered
        if (!walletAddress) {
            const shouldCreateWallet = confirm("You didn't enter a wallet address. Do you want us to create one for you?");
            if (shouldCreateWallet) {
                // You could fetch a generated wallet from backend here
                const response = await fetch('createKey.js'); // example endpoint
                const data = await response.json();

                if (data.publicKey) {
                    formData.set('wallet_address', data.publicKey);
                    alert("Wallet created: " + data.publicKey);
                } else {
                    alert("Failed to create wallet.");
                    return;
                }
            }
        }

        // Now send data to PHP backend
        try {
            const response = await fetch('auth_backend.php?action=signup', {
                method: 'POST',
                body: formData
            });

            const result = await response.text(); // or use response.json() if JSON
            console.log(result);
            alert("Signup successful!");
            // You can redirect or update UI here
        } catch (err) {
            console.error(err);
            alert("Signup failed.");
        }
    });

});
