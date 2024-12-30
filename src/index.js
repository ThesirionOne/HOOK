const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const commands = require('./bot/commands');
const { startServer } = require('./server');

let bot = null;
let isPolling = false;

async function startBot() {
  if (isPolling) {
    console.log('Bot ya está en funcionamiento');
    return;
  }

  try {
    // Detener cualquier instancia previa
    if (bot) {
      await bot.stopPolling();
    }

    // Crear nueva instancia
    bot = new TelegramBot(config.telegramToken, {
      polling: {
        interval: 300,
        autoStart: false,
        params: {
          timeout: 10
        }
      }
    });

    // Iniciar polling
    await bot.startPolling();
    isPolling = true;
    console.log('🚀 Bot de Neiro está en funcionamiento...');

    // Registrar comandos
    bot.onText(/\/start/, (msg) => commands.handleStart(bot, msg));
    bot.onText(/\/balance (.+)/, (msg, match) => commands.handleBalance(bot, msg, match));
    bot.onText(/\/neiro (.+)/, (msg, match) => commands.handleNeiroBalance(bot, msg, match));
    bot.onText(/\/gas/, (msg) => commands.handleGas(bot, msg));
    bot.onText(/\/wallet/, (msg) => commands.handleWallet(bot, msg));
    bot.onText(/\/precio/, (msg) => commands.handlePrice(bot, msg));

    // Manejar botones inline
    bot.on('callback_query', (callbackQuery) => {
      commands.handleCallbackQuery(bot, callbackQuery);
    });

    // Manejar mensajes de texto
    bot.on('message', (msg) => {
      if (!msg.text) return;

      switch (msg.text) {
        case '💰 Balance NEIRO':
          bot.sendMessage(msg.chat.id, '📝 Por favor, envía la dirección para consultar el balance de NEIRO');
          break;
        case '⛽ Gas ETH':
          commands.handleGas(bot, msg);
          break;
        case '💼 Mi Wallet':
          commands.handleWallet(bot, msg);
          break;
        case '📊 Precio NEIRO':
          commands.handlePrice(bot, msg);
          break;
        case '📱 Ayuda':
          commands.handleStart(bot, msg);
          break;
      }
    });

    // Manejo de errores
    bot.on('polling_error', async (error) => {
      console.log(`Error de polling: ${error.message}`);
      if (error.code === 'ETELEGRAM' && error.response.statusCode === 409) {
        isPolling = false;
        await bot.stopPolling();
        setTimeout(startBot, 5000);
      }
    });

  } catch (error) {
    console.error('Error iniciando el bot:', error);
    isPolling = false;
  }
}

// Iniciar servidor y bot
startServer();
startBot();

// Manejo de señales
process.on('SIGINT', async () => {
  if (bot) {
    isPolling = false;
    await bot.stopPolling();
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  if (bot) {
    isPolling = false;
    await bot.stopPolling();
  }
  process.exit(0);
});