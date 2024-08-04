"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { SendIcon, SquareIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const interviewTopics = [
  "Tips for Behavioral Interviews",
  "What to Wear to an Interview",
  "How to Follow Up After an Interview",
  "How to Negotiate Your Salary",
  "Best Practices for Technical Interviews",
];

export function Chatbot() {
  const [hideButtons, setHideButtons] = useState(false);
  const { messages, input, setInput, handleSubmit, isLoading, stop } = useChat({
    api: "api/chat",
  });

  const handleTopicClick = async (topic: string) => {
    try {
      setInput(topic);
      setHideButtons(true);
      await handleSubmit();
    } catch (error) {
      console.error("Error handling topic click:", error);
    }
  };

  const handleMessageSubmit = async () => {
    setHideButtons(true);
    await handleSubmit();
  };

  return (
    <div className="flex flex-col h-[100vh] w-full max-w-[100%] mx-auto bg-gray-100 rounded-lg shadow-lg">
      <div className="flex-1 overflow-auto p-6 bg-white">
        {messages.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full">
            <Image src="/ai.png" alt="AI" width={80} height={80} />
            <p className="text-lg text-gray-600 mt-4">
              Welcome to your Interview Coach! I’m here to help you prepare for
              your upcoming interviews. How can I assist you today?
            </p>
          </div>
        )}
        <div className="flex flex-col gap-4">
          {messages.map((message) =>
            message.role === "assistant" ? (
              <div key={message.id} className="flex items-start gap-3">
                <div className="p-2 border border-gray-300 rounded-full">
                  <Image src="/ai.png" alt="AI" width={20} height={20} />
                </div>
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <Markdown className="text-sm text-gray-800">
                    {message.content}
                  </Markdown>
                </div>
              </div>
            ) : (
              <div key={message.id} className="flex justify-end">
                <div className="bg-blue-500 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm text-white">{message.content}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="p-4 bg-blue-600 rounded-b-lg">
        {!hideButtons && (
          <div className="grid grid-cols-3 gap-2 mt-2 p-2">
            {interviewTopics.map((topic, index) => (
              <Button
                key={index}
                className="bg-blue-500 hover:bg-blue-700 text-white box-content py-1 px-2  text-xs rounded-md shadow-sm"
                onClick={() => handleTopicClick(topic)}
                style={{ whiteSpace: "normal", textAlign: "center" }}
              >
                {topic}
              </Button>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleMessageSubmit();
        }}
        className="bg-gray-200 px-4 py-3 flex items-center gap-2 border-t border-gray-300"
      >
        <div className="relative flex-1">
          <Textarea
            placeholder="Type your message..."
            className="rounded-lg pr-12 min-h-[64px] border border-gray-300"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            {!isLoading ? (
              <Button
                type="submit"
                size="icon"
                disabled={!input || isLoading}
                className="rounded-full"
              >
                <SendIcon className="w-5 h-5 text-blue-600" />
                <span className="sr-only">Send</span>
              </Button>
            ) : (
              <Button
                type="button"
                size="icon"
                disabled={!isLoading}
                onClick={stop}
                className="rounded-full"
              >
                <SquareIcon className="w-5 h-5 text-red-600" />
                <span className="sr-only">Stop</span>
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
