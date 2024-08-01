import { getUserchats, saveMessage } from "@/lib/chatService";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = await req.json();
    const chats = await getUserchats(userId);

    if (!chats) {
      return NextResponse.json({ message: "No chat found." }, { status: 204 });
    }

    return NextResponse.json(
      { message: "Successfully retrived chats", data: chats },
      { status: 200 },
    );
  } catch (err) {
    console.log("Error while getting chat: ", err);
    return NextResponse.json(
      { message: "Failed to retrieve chats" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId, content, sender } = await req.json();
    saveMessage(userId, content, sender);

    return NextResponse.json(
      { message: "Message saved successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.log("Error while saving chat: ", err);
    return NextResponse.json(
      { message: "Failed to save chat" },
      { status: 500 },
    );
  }
}
