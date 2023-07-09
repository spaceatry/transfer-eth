const Web3 = require('web3');

// Set up the Web3 provider with the Metamask injected provider
const web3 = new Web3(window.ethereum);

// Function to transfer ETH from Metamask wallet to another wallet
async function transferETH(recipientAddress, amount) {
  try {
    // Request user permission to access their Metamask account
    await window.ethereum.enable();

    const accounts = await web3.eth.getAccounts();
    const fromAddress = accounts[0]; // Assuming the user has selected the first account from Metamask

    // Validate recipient address and amount
    if (!web3.utils.isAddress(recipientAddress)) {
      throw new Error('Invalid recipient address');
    }

    if (!web3.utils.isBN(amount)) {
      throw new Error('Invalid amount');
    }

    // Perform the ETH transfer
    const txReceipt = await web3.eth.sendTransaction({
      from: fromAddress,
      to: recipientAddress,
      value: amount,
    });

    console.log('Transaction successful:', txReceipt);
  } catch (error) {
    console.error('Error transferring ETH:', error);
  }
}

// Usage: Call the function with the recipient address and amount
const recipientAddress = '0x1234567890abcdef'; // Replace with the recipient's ETH address
const amount = web3.utils.toWei('0.1', 'ether'); // Replace with the desired amount in ether

transferETH(recipientAddress, amount);
