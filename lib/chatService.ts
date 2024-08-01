import prisma from "@/lib/dbClient";
import getCurrentUser from "./getCurrentUser";
import getAIResponse from "./ai";
import generateChatTitle from "./titleGenerator";

export async function saveMessage(prompt: string, chatId?: string) {
  const result = await getAIResponse(prompt);
  const { userId } = await getCurrentUser();
  const title = await generateChatTitle(prompt);

  let chat;
  if (chatId) {
    chat = await prisma.chat.findFirst({
      where: { id: chatId },
    });
  } else {
    chat = await prisma.chat.create({
      data: {
        userId: userId,
        title: title,
      },
    });
  }

  return await prisma.message.create({
    data: {
      prompt: prompt,
      result: result,
      chatId: chat?.id,
    },
  });
}

export async function getUserchats(userId: string) {
  return await prisma.chat.findMany({
    where: {
      userId: userId,
    },
    include: {
      messages: true,
    },
  });
}

export async function getChatById(id: string) {
  return await prisma.chat.findUnique({
    where: {
      id: id,
    },
    include: {
      messages: true,
    },
  });
}
