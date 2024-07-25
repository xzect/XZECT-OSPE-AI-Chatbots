import { ChatComponent, Message } from "@/components"
import { getChatById } from "@/lib/chatService"

const ChatPage = async ({ params }: { params: { id: string } }) => {
  const chat = await getChatById(params.id)

  return <ChatComponent chat={chat} />
}

export default ChatPage
