function getMainKeyboard() {
  return {
    reply_markup: {
      keyboard: [
        ['💰 Balance NEIRO', '📊 Precio NEIRO'],
        ['⛽ Gas ETH', '📈 Último Bloque'],
        ['💼 Mi Wallet', '📱 Ayuda']
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

module.exports = {
  getMainKeyboard,
  getWalletKeyboard
};