import { type CoreMessage, streamText } from "ai";
import { google } from "@ai-sdk/google";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: google("models/gemini-1.5-pro-latest"),
    system: `You are an Interview Coach who offers tips and practice questions for job interviews. Your guidance is focused solely on the interview process and related preparations, and your response should be related to this only.`,
    messages,
  });

  return result.toAIStreamResponse();
}
