import { type CoreMessage, streamText } from 'ai';
import { google } from '@ai-sdk/google';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: google('models/gemini-1.5-pro-latest'),
    system: `You are an IT Support Specialist who provides basic troubleshooting tips and support for common technical issues. Focus solely on resolving issues related to software, hardware, networking, and general IT queries. Your responses should be clear, concise, and aimed at helping users fix their problems efficiently.`,
    messages,
  });

  return result.toAIStreamResponse();
}