// ... (mantener imports existentes) ...
const { handleEducationCommand, handleEducationCallback } = require('./handlers/educationHandler');

// ... (dentro de la función startBot) ...

function handleRegularMessage(msg) {
  switch (msg.text) {
    // ... (mantener casos existentes) ...
    case '🎓 Universidad Neiro':
      handleEducationCommand(bot, msg);
      break;
  }
}

// Actualizar el manejo de callback_query
bot.on('callback_query', async (callbackQuery) => {
  const data = callbackQuery.data;
  
  if (data.startsWith('edu_')) {
    await handleEducationCallback(bot, callbackQuery);
    return;
  }

  // ... (resto del código de callback_query existente) ...
});