import { GoogleGenerativeAI } from '@google/generative-ai';

const api_key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(api_key);

export async function gemini_model_call(messageStore) {
  // Ensure that messageStore is in the expected format
  if (!Array.isArray(messageStore) || messageStore.length === 0) {
    throw new Error('Invalid messageStore format or empty messageStore');
  }

  // Create a structured prompt by pairing each question with its response
  const prompt = messageStore.map(item => `Q: ${item.prompt}\nA: ${item.response}`).join('\n\n');

  const fullPrompt = `Based on the following conversation, generate a professional resume:\n\n${prompt}\n\nResume:`;

  // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: fullPrompt }]
      }
    ],
    generationConfig: {
      maxOutputTokens: 1000, // Increase token limit if necessary
    },
  });

  try {
    const result = await chat.sendMessage('');
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error with Gemini API:', error);
    throw new Error('Error with Gemini API');
  }
}
