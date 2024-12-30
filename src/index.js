const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const { startServer } = require('./server');
const web3Service = require('./services/web3Service');
const tokenService = require('./services/tokenService');
const priceService = require('./services/priceService');
const aiService = require('./services/aiService');
const { handleEducationCommand, handleEducationCallback } = require('./handlers/educationHandler');
const { getMainKeyboard, getWalletKeyboard, getAIToolsKeyboard } = require('./utils/keyboard');

// Cargar variables de entorno
dotenv.config();

// Crear instancia del bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Manejar el comando /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(
    chatId,
    '👋 ¡Bienvenido al Bot de Neiro!\n\nUsa los botones del menú para interactuar:',
    getMainKeyboard()
  );
});

// Manejar mensajes regulares
bot.on('message', async (msg) => {
  if (!msg.text) return;
  
  const chatId = msg.chat.id;

  switch (msg.text) {
    case '💰 Balance NEIRO':
      try {
        const balance = await tokenService.getNEIROBalance(msg.from.id);
        await bot.sendMessage(chatId, `Tu balance de NEIRO es: ${balance}`, getMainKeyboard());
      } catch (error) {
        await bot.sendMessage(chatId, '❌ Error al obtener el balance', getMainKeyboard());
      }
      break;

    case '📊 Precio NEIRO':
      try {
        const price = await priceService.getNeiroPrice();
        await bot.sendMessage(
          chatId, 
          `💎 Precio actual de NEIRO:\n${price.priceInEth} ETH`,
          getMainKeyboard()
        );
      } catch (error) {
        await bot.sendMessage(chatId, '❌ Error al obtener el precio', getMainKeyboard());
      }
      break;

    case '⛽ Gas ETH':
      try {
        const gasPrice = await web3Service.getGasPrice();
        await bot.sendMessage(
          chatId,
          `⛽ Precio del Gas: ${gasPrice} Gwei`,
          getMainKeyboard()
        );
      } catch (error) {
        await bot.sendMessage(chatId, '❌ Error al obtener el precio del gas', getMainKeyboard());
      }
      break;

    case '💼 Mi Wallet':
      await bot.sendMessage(
        chatId,
        '💼 Gestión de Wallet',
        getWalletKeyboard()
      );
      break;

    case '🤖 IA Tools':
      await bot.sendMessage(
        chatId,
        '🤖 Herramientas de IA\nElige una opción:',
        getAIToolsKeyboard()
      );
      break;

    case '🎓 Universidad Neiro':
      await handleEducationCommand(bot, msg);
      break;

    case '📱 Ayuda':
      await bot.sendMessage(
        chatId,
        '📱 *Ayuda*\n\nUsa los botones del menú para:\n\n' +
        '• Consultar precios y balances\n' +
        '• Gestionar tu wallet\n' +
        '• Usar herramientas de IA\n' +
        '• Aprender en la Universidad Neiro',
        { parse_mode: 'Markdown', ...getMainKeyboard() }
      );
      break;
  }
});

// Manejar callbacks de botones inline
bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data.startsWith('edu_')) {
    await handleEducationCallback(bot, callbackQuery);
    return;
  }

  switch (data) {
    case 'generate_tweet':
      await bot.sendMessage(chatId, '📝 ¿Sobre qué quieres que escriba el tweet?');
      break;
    
    case 'generate_meme':
      await bot.sendMessage(chatId, '🎨 Describe el meme que quieres crear:');
      break;
    
    case 'generate_tweet_image':
      await bot.sendMessage(chatId, '🎯 Describe el contenido para el tweet con imagen:');
      break;

    // Añadir más casos según sea necesario
  }
});

// Manejar errores
bot.on('polling_error', (error) => {
  console.error('Error de polling:', error);
});

// Iniciar el servidor web (necesario para algunos servicios de hosting)
startServer();

console.log('Bot iniciado correctamente!');
