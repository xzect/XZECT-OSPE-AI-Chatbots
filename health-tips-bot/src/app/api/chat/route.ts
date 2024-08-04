// import { chatRequestSchema } from "@/app/schemas/chatRequest.schema";
// import { google } from "@ai-sdk/google";
// import { Message, streamText } from "ai";
// import { NextRequest, NextResponse } from "next/server";

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: NextRequest) {
//   try {
//     const { messages } = (await req.json()) as { messages: Message[] };

//     if (!messages) {
//       return NextResponse.json(
//         { message: "Messages array cannot be empty" },
//         { status: 400 }
//       );
//     }

//     // Validate the request using zod
//     const { success, data, error } = chatRequestSchema.safeParse(messages);

//     if (!success) {
//       return NextResponse.json({ message: error.issues }, { status: 400 });
//     }

//     data.unshift({
//       role: "system",
//       content:
//         "You are a Health Tips Bot, an expert in providing health and wellness advice. Your goal is to offer accurate, practical, and easy-to-understand health tips to users. Your advice covers a wide range of topics, including nutrition, exercise, mental well-being, and general health maintenance. You should aim to be friendly, informative, and supportive in your responses. Always prioritize user safety and well-being, and remind users to consult with a healthcare professional for serious health concerns or specific medical advice.",
//     });

//     console.log("Request Data:", data);

//     const result = await streamText({
//       model: google("models/gemini-1.5-flash-latest"),
//       messages: data,
//       maxTokens: 300,
//     });

//     return result.toAIStreamResponse();
//   } catch (error: any) {
//     console.error("Error in /api/chat:", error);
//     return NextResponse.json(
//       { message: error.message || "An error occurred" },
//       { status: 500 }
//     );
//   }
// }



import { chatRequestSchema } from "@/app/schemas/chatRequest.schema";
import { google } from "@ai-sdk/google";
import { Message, streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages: Message[] };

    if (!messages) {
      return NextResponse.json(
        { message: "Messages array cannot be empty" },
        { status: 400 }
      );
    }

    // Validate the request using zod
    const { success, data, error } = chatRequestSchema.safeParse(messages);

    if (!success) {
      return NextResponse.json({ message: error.issues }, { status: 400 });
    }

    data.unshift({
      role: "system",
      content:
        "You are a Health Tips Bot, an expert in providing health and wellness advice. Your goal is to offer accurate, practical, and easy-to-understand health tips to users. Your advice covers a wide range of topics, including nutrition, exercise, mental well-being, and general health maintenance. You should aim to be friendly, informative, and supportive in your responses. Always prioritize user safety and well-being, and remind users to consult with a healthcare professional for serious health concerns or specific medical advice.",
    });

    console.log("Request Data:", data);

    const result = await streamText({
      model: google("models/gemini-1.5-flash-latest"),
      messages: data,
      maxTokens: 300,
    });

    return result.toAIStreamResponse();
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      { message: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
