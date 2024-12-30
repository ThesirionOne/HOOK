function getMainKeyboard() {
  return {
    reply_markup: {
      keyboard: [
        ['💰 Balance NEIRO', '📊 Precio NEIRO'],
        ['⛽ Gas ETH', '📈 Último Bloque'],
        ['💼 Mi Wallet', '🤖 IA Tools'],
        ['📱 Ayuda']
      ],
      resize_keyboard: true
    }
  };
}

function getWalletKeyboard() {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Ver Balance ETH', callback_data: 'check_eth' },
          { text: 'Ver Balance NEIRO', callback_data: 'check_neiro' }
        ],
        [
          { text: 'Añadir Wallet', callback_data: 'add_wallet' },
          { text: 'Mis Wallets', callback_data: 'list_wallets' }
        ]
      ]
    }
  };
}

function getAIToolsKeyboard() {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '✍️ Generar Tweet', callback_data: 'generate_tweet' },
          { text: '🎨 Crear Meme', callback_data: 'generate_meme' }
        ],
        [
          { text: '🎯 Tweet con Imagen', callback_data: 'generate_tweet_image' }
        ]
      ]
    }
  };
}

module.exports = {
  getMainKeyboard,
  getWalletKeyboard,
  getAIToolsKeyboard
};