import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  messages.unshift({
    role: "user",
    content: "You are a bot that only answers riddles or puzzles.",
  });

  // console.log("messages: ", messages); // TODO: Delete me
  const result = await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    messages,
    maxTokens: 200,
  });

  return result.toAIStreamResponse();
}
