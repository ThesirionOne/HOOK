const { OpenAI } = require('openai');
const axios = require('axios');
const sharp = require('sharp');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateTweet(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "Eres un experto en marketing de criptomonedas que crea tweets virales y efectivos."
      }, {
        role: "user",
        content: `Crea un tweet sobre: ${prompt}`
      }],
      max_tokens: 280
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generando tweet:', error);
    throw error;
  }
}

async function generateMeme(prompt) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Crea un meme sobre criptomonedas: ${prompt}`,
      n: 1,
      size: "1024x1024"
    });

    return response.data[0].url;
  } catch (error) {
    console.error('Error generando meme:', error);
    throw error;
  }
}

async function generateTweetWithImage(prompt) {
  try {
    const [tweet, imageUrl] = await Promise.all([
      generateTweet(prompt),
      generateMeme(prompt)
    ]);

    return {
      tweet,
      imageUrl
    };
  } catch (error) {
    console.error('Error generando tweet con imagen:', error);
    throw error;
  }
}

module.exports = {
  generateTweet,
  generateMeme,
  generateTweetWithImage
};