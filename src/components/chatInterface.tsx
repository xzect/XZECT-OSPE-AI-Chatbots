"use client";

import { useChat } from "ai/react";
import DefaultPrompt from "./defaultPrompt";
import ChatInput from "./chatInput";
import MessageStream from "./messageStream";

export default function ChatInterface() {
  const {
    messages,
    isLoading,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
  } = useChat();
  return (
    <>
      <div className="container h-full max-w-[768px] pt-24 flex">
        {/* 
        If there are no messages, we will display the DefaultPrompt component.
         */}
        {messages.length === 0 ? (
          <DefaultPrompt setInput={setInput} handleSubmit={handleSubmit} />
        ) : (
          <MessageStream isLoading={isLoading} messages={messages} />
        )}
      </div>

      {/* 
        This is the ChatInput component that we will create in the next step. 
        It will be used to handle the user's input and send it to the chatbot.
       */}
      <ChatInput
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        input={input}
      />
    </>
  );
}
