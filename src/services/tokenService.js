const { Web3 } = require('web3');
const config = require('../config');
const tokenAddresses = require('../constants/tokenAddresses');

const web3 = new Web3(config.quicknodeUrl);

// ABI mínimo para consultar balance y nombre de token
const minABI = [
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "type": "function"
  }
];

async function getTokenBalance(tokenAddress, walletAddress) {
  try {
    const contract = new web3.eth.Contract(minABI, tokenAddress);
    const balance = await contract.methods.balanceOf(walletAddress).call();
    const decimals = await contract.methods.decimals().call();
    return balance / Math.pow(10, decimals);
  } catch (error) {
    console.error('Error getting token balance:', error);
    throw error;
  }
}

async function getNEIROBalance(walletAddress) {
  return getTokenBalance(tokenAddresses.NEIRO, walletAddress);
}

module.exports = {
  getTokenBalance,
  getNEIROBalance
};