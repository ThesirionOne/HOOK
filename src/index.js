const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const commands = require('./bot/commands');
const { startServer } = require('./server');

// Iniciar servidor Express
startServer();

// Configuración del bot con opciones adicionales
const bot = new TelegramBot(config.telegramToken, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10
    }
  },
  webHook: false // Asegurarse de que no hay webhook configurado
});

// Sistema de reintentos
let retryCount = 0;
const maxRetries = 3;

function handlePollingError(error) {
  console.log(`Error de polling: ${error.message}`);
  
  if (error.code === 'ETELEGRAM' && error.response.statusCode === 409) {
    if (retryCount < maxRetries) {
      retryCount++;
      console.log(`Reintentando conexión (intento ${retryCount}/${maxRetries})...`);
      
      // Detener el polling actual
      bot.stopPolling()
        .then(() => {
          // Esperar antes de reiniciar
          setTimeout(() => {
            bot.startPolling({ restart: true });
          }, 5000);
        })
        .catch(console.error);
    } else {
      console.log('Número máximo de reintentos alcanzado. Por favor, reinicia el bot manualmente.');
      process.exit(1);
    }
  }
}

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
      bot.sendMessage(msg.chat.id, '🔍 Consultando precio de NEIRO...');
      // Aquí implementaremos la consulta de precio
      break;
    case '📈 Último Bloque':
      commands.handleLastBlock(bot, msg);
      break;
    case '📱 Ayuda':
      commands.handleStart(bot, msg);
      break;
  }
});

// Manejo de errores de polling
bot.on('polling_error', handlePollingError);

console.log('🚀 Bot de Neiro está en funcionamiento...');

// Manejo de señales de terminación
process.on('SIGINT', () => {
  bot.stopPolling()
    .then(() => {
      console.log('Bot detenido correctamente');
      process.exit(0);
    });
});

process.on('SIGTERM', () => {
  bot.stopPolling()
    .then(() => {
      console.log('Bot detenido correctamente');
      process.exit(0);
    });
});
