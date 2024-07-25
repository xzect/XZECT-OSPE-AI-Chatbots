import { Message } from "ai";
import { BotMessageSquare, Info, Loader, User } from "lucide-react";
import React, { ReactNode } from "react";
import Markdown from "react-markdown";
import "./markdown-styles.css";

type Props = {
  messages: Message[];
  isLoading: boolean;
  error: Error | undefined;
};

export default function MessageStream({ messages, isLoading, error }: Props) {
  return (
    <section className="w-full">
      {messages.map((message, index) => (
        <MessageList
          key={index}
          role={message.role}
          content={message.content}
        />
      ))}

      {isLoading && (
        <MessageList
          status={<Loader className="animate-spin" size={14} />}
          role="assistant"
          content=""
        />
      )}
      {error && (
        <MessageList
          role="assistant"
          status={<ErrorMessage message="Something went wrong!" />}
          content={error.message}
        />
      )}
    </section>
  );
}

type MessageListProps = {
  role: Message["role"];
  content: Message["content"];
  status?: ReactNode;
};

/**
 * MessageList component displays chat messages in the interface.
 *
 * @param {string} role - The role of the message sender (either 'user' or 'assistant').
 * @param {string} content - The content of the message.
 * @param {ReactNode} status - The status of the message (e.g., 'loading', 'error').
 * @returns {JSX.Element} The React component rendering the message.
 */
function MessageList({ role, content, status }: MessageListProps): JSX.Element {
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
        {status ? (
          <div>{status}</div>
        ) : (
          <Markdown className={"markdown-body"}>{content}</Markdown>
        )}
      </div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="text-red-500 font-medium flex items-center gap-2 border border-red-500/50 bg-red-500/5 py-2 px-4 rounded">
      <Info size={14} />
      {message}
    </p>
  );
}
