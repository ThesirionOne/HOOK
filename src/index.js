const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const commands = require('./bot/commands');
const { startServer } = require('./server');

// Start Express server
startServer();

// Initialize Telegram Bot
const bot = new TelegramBot(config.telegramToken, { polling: true });

// Register commands
bot.onText(/\/start/, (msg) => commands.handleStart(bot, msg));
bot.onText(/\/balance (.+)/, (msg, match) => commands.handleBalance(bot, msg, match));
bot.onText(/\/gas/, (msg) => commands.handleGas(bot, msg));
bot.onText(/\/blockNumber/, (msg) => commands.handleBlockNumber(bot, msg));

// Error handling
bot.on('polling_error', (error) => {
  console.log('Polling error:', error);
});

console.log('Super Neiro Bot is running...');