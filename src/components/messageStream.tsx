import { Message } from "ai";
import { BotMessageSquare, Loader, User } from "lucide-react";
import React from "react";
import Markdown from "react-markdown";
import "./markdown-styles.css";

type Props = {
  messages: Message[];
  isLoading: boolean;
};

export default function MessageStream({ messages, isLoading }: Props) {
  return (
    <section className="w-full">
      {messages.map((message, index) => (
        <MessageList
          key={index}
          role={message.role}
          content={message.content}
        />
      ))}

      {isLoading && <MessageList thinkingEffect role="assistant" content="" />}
    </section>
  );
}

type MessageListProps = {
  role: Message["role"];
  content: Message["content"];
  thinkingEffect?: boolean;
};

/**
 * MessageList component
 * @param param0
 * @returns
 */
function MessageList({ role, content, thinkingEffect }: MessageListProps) {
  return (
    <div className={`flex gap-4 w-full ${role === "assistant" && "mb-8"}`}>
      <div
        className={`${
          role === "user" ? "bg-black text-white" : "bg-gray-300 text-black"
        } rounded-md aspect-square w-8 h-8 border flex justify-center items-center mt-4`}
      >
        {role === "user" ? <User size={16} /> : <BotMessageSquare size={22} />}
      </div>
      <div className=" border-b pt-4 flex-1 ">
        {thinkingEffect ? (
          <div>
            <Loader className="animate-spin" size={14} />
          </div>
        ) : (
          <Markdown className={"markdown-body"}>{content}</Markdown>
        )}
      </div>
    </div>
  );
}
