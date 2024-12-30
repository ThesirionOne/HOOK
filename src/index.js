// ... (mantener imports y configuración inicial) ...

// Añadir al objeto de estado de usuarios
const userStates = new Map();

async function startBot() {
  // ... (mantener código existente hasta el manejo de mensajes) ...

  // Actualizar el manejo de mensajes
  bot.on('message', async (msg) => {
    if (!msg.text) return;

    const chatId = msg.chat.id;
    const userState = userStates.get(chatId);

    if (userState) {
      switch (userState) {
        case 'WAITING_TWEET':
          await commands.handleTweetGeneration(bot, msg);
          userStates.delete(chatId);
          break;
        case 'WAITING_MEME':
          await commands.handleMemeGeneration(bot, msg);
          userStates.delete(chatId);
          break;
        case 'WAITING_TWEET_IMAGE':
          await commands.handleTweetWithImage(bot, msg);
          userStates.delete(chatId);
          break;
        default:
          handleRegularMessage(msg);
      }
    } else {
      handleRegularMessage(msg);
    }
  });

  function handleRegularMessage(msg) {
    switch (msg.text) {
      // ... (mantener casos existentes) ...
      case '🤖 IA Tools':
        commands.handleAITools(bot, msg);
        break;
    }
  }

  // Actualizar el manejo de callback_query
  bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    
    switch (callbackQuery.data) {
      case 'generate_tweet':
        userStates.set(chatId, 'WAITING_TWEET');
        break;
      case 'generate_meme':
        userStates.set(chatId, 'WAITING_MEME');
        break;
      case 'generate_tweet_image':
        userStates.set(chatId, 'WAITING_TWEET_IMAGE');
        break;
    }
    
    await commands.handleCallbackQuery(bot, callbackQuery);
  });

  // ... (mantener el resto del código) ...
}