document.addEventListener("DOMContentLoaded", () => {
    console.log("Signup.js loaded");
    const walletLink = document.getElementById('createWalletLink');

    walletLink.addEventListener('click', function (e) {
        if (typeof window.ethereum !== 'undefined') {
            try {
                window.ethereum.request({ method: 'eth_requestAccounts' })
                    .then(accounts => {
                        showCustomAlert('Wallet connected successfully!', "Your account address : " + accounts[0], null);
                        document.getElementById('wallet_address').value = accounts[0];
                    });
            } catch (error) {
                console.error('MetaMask error:', error);
            }
        } else {
            alert('MetaMask is not installed. Redirecting to download...');
            window.open('https://metamask.io/download.html', '_blank');
        }
    });
});