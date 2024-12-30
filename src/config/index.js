const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  telegramToken: process.env.TELEGRAM_BOT_TOKEN,
  quicknodeUrl: process.env.QUICKNODE_HTTP_URL,
  port: process.env.PORT || 3000
};