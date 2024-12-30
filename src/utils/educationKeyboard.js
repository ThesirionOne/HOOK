function getEducationMainKeyboard() {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📚 Conceptos Básicos', callback_data: 'edu_basics' },
          { text: '🎓 Temas Avanzados', callback_data: 'edu_advanced' }
        ],
        [
          { text: '🪙 Neiro Token', callback_data: 'edu_neiro' }
        ],
        [
          { text: '🏛 Ver Universidad Completa', url: 'https://neiro-educative-center-nec.gitbook.io/neiro-educative-center-nec' }
        ]
      ]
    }
  };
}

function getTopicKeyboard(topic) {
  const topics = {
    basics: [
      [
        { text: '🔗 Blockchain', callback_data: 'edu_basics_blockchain' },
        { text: '💰 Criptomonedas', callback_data: 'edu_basics_crypto' }
      ],
      [
        { text: '🏦 DeFi', callback_data: 'edu_basics_defi' },
        { text: '🎨 NFTs', callback_data: 'edu_basics_nfts' }
      ]
    ],
    advanced: [
      [
        { text: '📊 Trading', callback_data: 'edu_advanced_trading' },
        { text: '📈 Análisis Técnico', callback_data: 'edu_advanced_ta' }
      ],
      [
        { text: '📊 Tokenomics', callback_data: 'edu_advanced_tokenomics' }
      ]
    ],
    neiro: [
      [
        { text: '📊 Tokenomics', callback_data: 'edu_neiro_tokenomics' },
        { text: '⚡ Utilidad', callback_data: 'edu_neiro_utility' }
      ],
      [
        { text: '🗺 Roadmap', callback_data: 'edu_neiro_roadmap' }
      ]
    ]
  };

  return {
    reply_markup: {
      inline_keyboard: [
        ...topics[topic],
        [{ text: '⬅️ Volver', callback_data: 'edu_main' }]
      ]
    }
  };
}