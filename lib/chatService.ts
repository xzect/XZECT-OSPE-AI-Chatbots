import prisma from "@/lib/dbClient"

export async function saveMessage(userId: string, content: any, sender: any) {
  const conversation = await prisma.conversation.findFirst({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
  })

  const newConversation = conversation || await prisma.conversation.create({
      data: {
        userId: userId,
      },
  })
  
  await prisma.message.create({
    data: {
      content: content,
      sender: sender,
      conversationId: newConversation.id
    }
  })
}

export async function getUserConversations(userId: string) {
  return await prisma.conversation.findMany({
    where: {
      userId: userId
    },
    include: {
      messages: true
    }
  })
}
