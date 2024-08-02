import { redirect } from "next/navigation"
import { ChatComponent } from "@/components"
import { getChatById } from "@/lib/chatService"
import getCurrentUser from "@/lib/getCurrentUser"

const ChatPage = async ({ params }: { params: { id: string } }) => {
  const chat = await getChatById(params.id)
  const { userId } = await getCurrentUser()

  if (!userId) {
    redirect("/login")
  }

  return <ChatComponent chat={chat} />
}

export default ChatPage
