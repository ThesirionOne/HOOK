const { Web3 } = require('web3');
const config = require('../config');

const web3 = new Web3(config.quicknodeUrl);

async function getBalance(address) {
  const balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance, 'ether');
}

async function getGasPrice() {
  const gasPrice = await web3.eth.getGasPrice();
  return web3.utils.fromWei(gasPrice, 'gwei');
}

async function getBlockNumber() {
  return await web3.eth.getBlockNumber();
}

module.exports = {
  getBalance,
  getGasPrice,
  getBlockNumber
};