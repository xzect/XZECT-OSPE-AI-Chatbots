import { NextResponse } from "next/server";
import { saveMessage } from "@/lib/chatService";

export async function POST(req: Request) {
  const { prompt, chatId } = await req.json();

  const message = await saveMessage(prompt, chatId);

  return NextResponse.json({ message });
}
