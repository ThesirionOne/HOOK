const express = require('express');
const config = require('./config');

function startServer() {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Super Neiro Bot is running!');
  });

  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
}

module.exports = { startServer };