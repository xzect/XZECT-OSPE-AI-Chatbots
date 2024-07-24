import { getUserConversations, saveMessage } from "@/lib/chatService"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { userId } = await req.json()
    const conversations = await getUserConversations(userId)

    if (!conversations) {
      return NextResponse.json(
        { message: "No conversation found." },
        { status: 204 }
      )
    }

    return NextResponse.json(
      { message: "Successfully retrived conversations", data: conversations },
      { status: 200 }
    )
  } catch (err) {
    console.log("Error while getting conversation: ", err)
    return NextResponse.json(
      { message: "Failed to retrieve conversations" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const { userId, content, sender } = await req.json()
    saveMessage(userId, content, sender)

    return NextResponse.json(
      { message: "Message saved successfully" },
      { status: 200 }
    )
  } catch (err) {
    console.log("Error while saving conversation: ", err)
    return NextResponse.json(
      { message: "Failed to save conversation" },
      { status: 500 }
    )
  }
}
