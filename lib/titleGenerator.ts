import getAIResponse from "./ai"

export default async function generateChatTitle(message: string) {
  const title = await getAIResponse(
    `Generate a short title for this message (don't add anything just one line): ${message}`
  )

  return title
}
