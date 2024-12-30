const axios = require('axios');

const GITBOOK_BASE_URL = 'https://neiro-educative-center-nec.gitbook.io/neiro-educative-center-nec';

const topics = {
  basics: {
    title: 'Conceptos Básicos',
    sections: ['Blockchain', 'Criptomonedas', 'DeFi', 'NFTs']
  },
  advanced: {
    title: 'Temas Avanzados',
    sections: ['Trading', 'Análisis Técnico', 'Tokenomics']
  },
  neiro: {
    title: 'Neiro Token',
    sections: ['Tokenomics', 'Utilidad', 'Roadmap']
  }
};

async function getTopicContent(topic, section) {
  try {
    // Aquí implementarías la lógica para obtener el contenido específico
    // Por ahora retornamos contenido estático como ejemplo
    return {
      title: `${section} - ${topics[topic].title}`,
      content: `Contenido educativo sobre ${section} en ${topics[topic].title}`,
      url: `${GITBOOK_BASE_URL}/${topic}/${section.toLowerCase()}`
    };
  } catch (error) {
    console.error('Error obteniendo contenido educativo:', error);
    throw error;
  }
}

function getAvailableTopics() {
  return topics;
}

module.exports = {
  getTopicContent,
  getAvailableTopics
};