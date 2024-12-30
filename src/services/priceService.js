const { Web3 } = require('web3');
const config = require('../config');
const tokenAddresses = require('../constants/tokenAddresses');

const web3 = new Web3(config.quicknodeUrl);

// ABI mínimo para consultar precio
const uniswapV2PairABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "getReserves",
    "outputs": [
      {"name": "_reserve0","type": "uint112"},
      {"name": "_reserve1","type": "uint112"},
      {"name": "_blockTimestampLast","type": "uint32"}
    ],
    "type": "function"
  }
];

async function getNeiroPrice() {
  try {
    // Dirección del par NEIRO/WETH en Uniswap V2
    const pairAddress = "0x2db0a6426a47e46b1bf4d9f1c7b684b3a2d2cd5e";
    const pair = new web3.eth.Contract(uniswapV2PairABI, pairAddress);
    
    const reserves = await pair.methods.getReserves().call();
    const neiroReserve = reserves._reserve0;
    const wethReserve = reserves._reserve1;
    
    // Calcular precio en ETH
    const priceInEth = wethReserve / neiroReserve;
    
    return {
      priceInEth,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Error getting NEIRO price:', error);
    throw error;
  }
}

module.exports = {
  getNeiroPrice
};