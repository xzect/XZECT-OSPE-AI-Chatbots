
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  import dotenv from 'dotenv'
  dotenv.config();
  

  const apiKey = "AIzaSyAgkdZRfW0oZFoO9pWLv59O_3_nsKqFcq0";
  console.log(apiKey);
 
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const homeImprovementKeywords = [
    "home", "interior", "renovate", "remodel", "paint", "lighting", "DIY", 
    "kitchen", "bathroom", "garden", "furniture", "repair", "decorate", "tools"
];
  const isHomeImprovementRelated = (prompt) => {
  return homeImprovementKeywords.some(keyword =>
      prompt.toLowerCase().includes(keyword)
  );
};
  
 async function run(prompt) {
  if (!isHomeImprovementRelated(prompt)) {
      return "I'm a home-improvement bot, and I can help with questions related to home improvement. Please ask me something about home projects!";
  }
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });
  
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
  }
  
  export default run;