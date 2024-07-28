const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
export async function getChatResponse(prompt) {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    // console.log(response);
    const text = response.text();
    return text;
}
