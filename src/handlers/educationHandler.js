const educationService = require('../services/educationService');
const { getEducationMainKeyboard, getTopicKeyboard } = require('../utils/educationKeyboard');

async function handleEducationCommand(bot, msg) {
  const chatId = msg.chat.id;
  await bot.sendMessage(
    chatId,
    '🎓 Bienvenido a Neiro Kennel University\n\nSelecciona una categoría para aprender:',
    getEducationMainKeyboard()
  );
}

async function handleEducationCallback(bot, callbackQuery) {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === 'edu_main') {
    return handleEducationCommand(bot, { chat: { id: chatId } });
  }

  const [prefix, topic, section] = data.split('_');
  
  if (!section) {
    // Es una categoría principal
    await bot.sendMessage(
      chatId,
      `📚 Selecciona un tema de ${topic.charAt(0).toUpperCase() + topic.slice(1)}:`,
      getTopicKeyboard(topic)
    );
    return;
  }

  try {
    const content = await educationService.getTopicContent(topic, section);
    await bot.sendMessage(
      chatId,
      `📖 *${content.title}*\n\n${content.content}\n\n🔗 [Leer más](${content.url})`,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [[{ text: '⬅️ Volver', callback_data: `edu_${topic}` }]]
        }
      }
    );
  } catch (error) {
    await bot.sendMessage(
      chatId,
      '❌ Error al obtener el contenido educativo. Por favor, intenta de nuevo.',
      getEducationMainKeyboard()
    );
  }
}

module.exports = {
  handleEducationCommand,
  handleEducationCallback
};