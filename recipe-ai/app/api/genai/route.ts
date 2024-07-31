import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

//export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const messages = reqBody.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new NextResponse(JSON.stringify({ text: 'Invalid input' }), { status: 400 });
    }

    const promptWithParts = buildGoogleGenAIPrompt(messages);

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(promptWithParts);
    const responseText = await result.response.text();

    return new NextResponse(JSON.stringify({ text: responseText }));
  } catch (error) {
    console.error('Error processing request:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
  
}

function buildGoogleGenAIPrompt(messages: { role: string; content: string }[]) {
  return {
    contents: messages
      .filter((message) => message.role === 'user' || message.role === 'assistant')
      .map((message) => ({
        role: message.role === 'user' ? 'user' : 'model',
        parts: [{ text: message.content }],
      })),
  };
}



// import { NextRequest, NextResponse } from 'next/server';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// // IMPORTANT! Set the runtime to edge
// export const runtime = 'edge';

// export async function POST(req: NextRequest) {
//   try {
//     const reqBody = await req.json();
//     const messages = reqBody.messages;

//     if (!Array.isArray(messages) || messages.length === 0) {
//       return new NextResponse(JSON.stringify({ text: 'Invalid input' }), { status: 400 });
//     }

//     const promptWithParts = buildGoogleGenAIPrompt(messages);

//     const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!); // Ensure your API key is correctly set
//     const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

//     const result = await model.generateContent(promptWithParts);
//     const responseText = await result.response.text();

//     return new NextResponse(JSON.stringify({ text: responseText }));
//   } catch (error) {
//     console.error('Error processing request:', error);
//     return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
//   }
// }

// function buildGoogleGenAIPrompt(messages: { role: string; content: string }[]) {
//   return {
//     contents: messages
//       .filter((message) => message.role === 'user' || message.role === 'assistant')
//       .map((message) => ({
//         role: message.role === 'user' ? 'user' : 'model',
//         parts: [{ text: message.content }],
//       })),
//   };
// }
