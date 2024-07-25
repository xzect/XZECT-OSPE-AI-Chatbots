import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export default async function getAIResponse(prompt: string) {
  try {
    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.log("Error while getting AI request", error)
    throw error
  }
}
