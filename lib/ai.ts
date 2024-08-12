import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

const salesKeywords = [
  "buy",
  "purchase",
  "order",
  "sales",
  "discount",
  "price",
  "offer",
  "product",
  "service",
  "recommend",
  "suggest",
  "best",
  "top",
  "deal",
  "value",
  "cheap",
  "affordable",
  "budget",
  "under",
  "comparison",
  "features",
  "quality",
  "availability",
  "stock",
  "warranty",
  "return",
  "exchange",
  "review",
  "customer feedback",
  "specifications",
  "latest",
  "new",
]

function isSalesRelated(prompt: string): boolean {
  return salesKeywords.some((keyword) => prompt.toLowerCase().includes(keyword))
}

export default async function getAIResponse(prompt: string) {
  if (!isSalesRelated(prompt)) {
    return "I'm sorry, I can only assist with sales-related inquiries."
  }

  try {
    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.log("Error while getting AI request", error)
    throw error
  }
}
