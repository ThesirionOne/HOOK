// ... (mantener código existente) ...

function getMainKeyboard() {
  return {
    reply_markup: {
      keyboard: [
        ['💰 Balance NEIRO', '📊 Precio NEIRO'],
        ['⛽ Gas ETH', '📈 Último Bloque'],
        ['💼 Mi Wallet', '🤖 IA Tools'],
        ['🎓 Universidad Neiro', '📱 Ayuda']
      ],
      resize_keyboard: true
    }
  };
}