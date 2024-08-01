"use client";

import { BiSend } from "react-icons/bi";
import { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import apiRequest from "@/lib/apiRequest";
import Message from "./Message";

const ChatComponent = ({ chat }: { chat?: any }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState(chat?.messages || []);

  const handleSubmit = useCallback(async () => {
    console.log("submitting");
    let chatId: string | undefined;
    if (chat) {
      chatId = chat.id;
    }

    try {
      const { data } = await apiRequest<{ message: any }>(
        "/api/chat/message",
        "POST",
        {
          prompt,
          chatId,
        },
      );
      const message = data?.message;

      if (message) {
        setMessages((prevMessages: any) => [...prevMessages, message]);

        if (pathname === "/") {
          router.push(`/chat/${message.chatId}`);
        }
      }
    } catch (error) {
      console.error("Error submitting message:", error);
    } finally {
      setPrompt("");
    }
  }, [prompt, chat, pathname, router]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow h-[calc(100vh-200px)] overflow-y-scroll pb-[100px]">
        {messages.map((message: any) => (
          <Message
            prompt={message.prompt}
            result={message.result}
            key={message.id}
          />
        ))}
      </div>
      <div className="bg-slate-900 p-3 absolute bottom-0 left-0 right-0">
        <div className="flex gap-2">
          <textarea
            name="prompt"
            id="prompt"
            placeholder="Enter your prompt"
            className="resize-none w-full bg-slate-400 rounded-lg flex-grow outline-none border-0 p-2"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-700 rounded-lg w-[80px] grid place-content-center"
            onClick={handleSubmit}
          >
            <BiSend size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
