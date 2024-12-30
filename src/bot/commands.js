const web3Service = require('../services/web3Service');

const commands = {
  async handleStart(bot, msg) {
    const chatId = msg.chat.id;
    const welcomeMessage = `Welcome to Super Neiro Ethereum Bot! 🤖\n\n` +
      `Available commands:\n` +
      `/balance <address> - Check ETH balance\n` +
      `/price - Get current ETH price\n` +
      `/gas - Get current gas prices\n` +
      `/blockNumber - Get latest block number`;
    
    await bot.sendMessage(chatId, welcomeMessage);
  },

  async handleBalance(bot, msg, match) {
    const chatId = msg.chat.id;
    const address = match[1];

    try {
      const balance = await web3Service.getBalance(address);
      await bot.sendMessage(chatId, `Balance: ${balance} ETH`);
    } catch (error) {
      await bot.sendMessage(chatId, 'Error: Invalid address or network issue');
    }
  },

  async handleGas(bot, msg) {
    const chatId = msg.chat.id;
    
    try {
      const gasPrice = await web3Service.getGasPrice();
      await bot.sendMessage(chatId, `Current gas price: ${gasPrice} Gwei`);
    } catch (error) {
      await bot.sendMessage(chatId, 'Error fetching gas price');
    }
  },

  async handleBlockNumber(bot, msg) {
    const chatId = msg.chat.id;
    
    try {
      const blockNumber = await web3Service.getBlockNumber();
      await bot.sendMessage(chatId, `Current block number: ${blockNumber}`);
    } catch (error) {
      await bot.sendMessage(chatId, 'Error fetching block number');
    }
  }
};

module.exports = commands;