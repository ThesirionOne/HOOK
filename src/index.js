const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const commands = require('./bot/commands');
const { startServer } = require('./server');

// Iniciar servidor Express
startServer();

// Inicializar Bot de Telegram
const bot = new TelegramBot(config.telegramToken, { polling: true });

// Registrar comandos
bot.onText(/\/start/, (msg) => commands.handleStart(bot, msg));
bot.onText(/\/balance (.+)/, (msg, match) => commands.handleBalance(bot, msg, match));
bot.onText(/\/neiro (.+)/, (msg, match) => commands.handleNeiroBalance(bot, msg, match));
bot.onText(/\/gas/, (msg) => commands.handleGas(bot, msg));
bot.onText(/\/wallet/, (msg) => commands.handleWallet(bot, msg));

// Manejar botones inline
bot.on('callback_query', (callbackQuery) => {
  commands.handleCallbackQuery(bot, callbackQuery);
});

// Manejar mensajes de texto (para los botones del teclado)
bot.on('message', (msg) => {
  if (msg.text === '💰 Balance NEIRO') {
    bot.sendMessage(msg.chat.id, '📝 Por favor, envía la dirección para consultar el balance de NEIRO');
  } else if (msg.text === '⛽ Gas ETH') {
    commands.handleGas(bot, msg);
  } else if (msg.text === '💼 Mi Wallet') {
    commands.handleWallet(bot, msg);
  }
});

// Manejo de errores
bot.on('polling_error', (error) => {
  console.log('Error de polling:', error);
});

console.log('🚀 Bot de Neiro está en funcionamiento...');