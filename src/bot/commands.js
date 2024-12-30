const web3Service = require('../services/web3Service');
const tokenService = require('../services/tokenService');
const priceService = require('../services/priceService');
const aiService = require('../services/aiService');
const { getMainKeyboard, getWalletKeyboard, getAIToolsKeyboard } = require('../utils/keyboard');

// ... (mantener el código existente) ...

const commands = {
  // ... (mantener los comandos existentes) ...

  async handleAITools(bot, msg) {
    const chatId = msg.chat.id;
    await bot.sendMessage(
      chatId,
      '🤖 Herramientas de IA\nElige una opción:',
      getAIToolsKeyboard()
    );
  },

  async handleCallbackQuery(bot, callbackQuery) {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;

    switch (data) {
      // ... (mantener casos existentes) ...
      
      case 'generate_tweet':
        await bot.sendMessage(chatId, '📝 ¿Sobre qué quieres que escriba el tweet?');
        break;
      
      case 'generate_meme':
        await bot.sendMessage(chatId, '🎨 Describe el meme que quieres crear:');
        break;
      
      case 'generate_tweet_image':
        await bot.sendMessage(chatId, '🎯 Describe el contenido para el tweet con imagen:');
        break;
    }
  },

  async handleTweetGeneration(bot, msg) {
    const chatId = msg.chat.id;
    try {
      await bot.sendMessage(chatId, '⏳ Generando tweet...');
      const tweet = await aiService.generateTweet(msg.text);
      await bot.sendMessage(chatId, `✨ Tweet generado:\n\n${tweet}`, getMainKeyboard());
    } catch (error) {
      await bot.sendMessage(chatId, '❌ Error generando el tweet', getMainKeyboard());
    }
  },

  async handleMemeGeneration(bot, msg) {
    const chatId = msg.chat.id;
    try {
      await bot.sendMessage(chatId, '⏳ Generando meme...');
      const imageUrl = await aiService.generateMeme(msg.text);
      await bot.sendPhoto(chatId, imageUrl, { caption: '✨ ¡Meme generado!' });
    } catch (error) {
      await bot.sendMessage(chatId, '❌ Error generando el meme', getMainKeyboard());
    }
  },

  async handleTweetWithImage(bot, msg) {
    const chatId = msg.chat.id;
    try {
      await bot.sendMessage(chatId, '⏳ Generando tweet con imagen...');
      const { tweet, imageUrl } = await aiService.generateTweetWithImage(msg.text);
      await bot.sendPhoto(chatId, imageUrl, { 
        caption: `✨ Tweet generado:\n\n${tweet}` 
      });
    } catch (error) {
      await bot.sendMessage(chatId, '❌ Error generando el contenido', getMainKeyboard());
    }
  }
};

module.exports = commands;