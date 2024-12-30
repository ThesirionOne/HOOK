const web3Service = require('../services/web3Service');
const tokenService = require('../services/tokenService');
const priceService = require('../services/priceService');
const { getMainKeyboard, getWalletKeyboard } = require('../utils/keyboard');

const commands = {
  async handleStart(bot, msg) {
    const chatId = msg.chat.id;
    const welcomeMessage = `¡Bienvenido al Bot de Neiro en Ethereum! 🚀\n\n` +
      `Puedes usar los botones del menú o los siguientes comandos:\n\n` +
      `🔹 /balance <dirección> - Ver balance de ETH\n` +
      `🔹 /neiro <dirección> - Ver balance de NEIRO\n` +
      `🔹 /gas - Precio actual del gas\n` +
      `🔹 /precio - Precio de NEIRO\n` +
      `🔹 /wallet - Gestionar wallets`;
    
    await bot.sendMessage(chatId, welcomeMessage, getMainKeyboard());
  },

  async handleBalance(bot, msg, match) {
    const chatId = msg.chat.id;
    const address = match[1];

    try {
      const balance = await web3Service.getBalance(address);
      await bot.sendMessage(chatId, `💰 Balance ETH: ${balance} ETH`, getMainKeyboard());
    } catch (error) {
      await bot.sendMessage(chatId, '❌ Error: Dirección inválida o problema de red', getMainKeyboard());
    }
  },

  async handleNeiroBalance(bot, msg, match) {
    const chatId = msg.chat.id;
    const address = match[1];

    try {
      const balance = await tokenService.getNEIROBalance(address);
      await bot.sendMessage(
        chatId, 
        `💎 Balance NEIRO: ${balance.toFixed(2)} NEIRO\n\n` +
        `Dirección del contrato: 0xee2a03aa6dacf51c18679c516ad5283d8e7c2637`,
        getMainKeyboard()
      );
    } catch (error) {
      await bot.sendMessage(chatId, '❌ Error: No se pudo obtener el balance de NEIRO', getMainKeyboard());
    }
  },

  async handleGas(bot, msg) {
    const chatId = msg.chat.id;
    
    try {
      const gasPrice = await web3Service.getGasPrice();
      await bot.sendMessage(
        chatId, 
        `⛽ Precio actual del Gas:\n${gasPrice} Gwei`,
        getMainKeyboard()
      );
    } catch (error) {
      await bot.sendMessage(chatId, '❌ Error obteniendo precio del gas', getMainKeyboard());
    }
  },

  async handlePrice(bot, msg) {
    const chatId = msg.chat.id;
    
    try {
      const price = await priceService.getNeiroPrice();
      await bot.sendMessage(
        chatId,
        `💎 Precio de NEIRO:\n${price.priceInEth.toFixed(8)} ETH`,
        getMainKeyboard()
      );
    } catch (error) {
      await bot.sendMessage(
        chatId,
        '❌ Error obteniendo el precio de NEIRO',
        getMainKeyboard()
      );
    }
  },

  async handleWallet(bot, msg) {
    const chatId = msg.chat.id;
    await bot.sendMessage(
      chatId,
      '💼 Gestión de Wallets',
      getWalletKeyboard()
    );
  },

  async handleCallbackQuery(bot, callbackQuery) {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;

    switch (data) {
      case 'check_eth':
        await bot.sendMessage(chatId, '📝 Por favor, envía la dirección ETH que quieres consultar');
        break;
      case 'check_neiro':
        await bot.sendMessage(chatId, '📝 Por favor, envía la dirección para consultar el balance de NEIRO');
        break;
      case 'add_wallet':
        await bot.sendMessage(chatId, '📝 Envía la dirección de la wallet que quieres guardar');
        break;
    }
  }
};

module.exports = commands;