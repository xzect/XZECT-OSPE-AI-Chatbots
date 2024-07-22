import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export default async function GenerateText(prompt: string) {
  const result = await model.generateContent(prompt)
  const responseText = result.response.text()

  console.log(responseText)
  return responseText
}
