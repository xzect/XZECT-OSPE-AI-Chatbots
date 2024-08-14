"use client";
import React, { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = async () => {
    if (!userInput.trim()) return; // Prevent empty input from being submitted

    setIsLoading(true);
    const updatedChatHistory = [
      ...chatHistory,
      { role: 'user', content: userInput },
    ];
    setChatHistory(updatedChatHistory);

    try {
      console.log("Sending request to OpenAI..."); // Log before request
      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: updatedChatHistory,
      });
      console.log("Received response:", chatCompletion); // Log response

      const assistantMessage = chatCompletion.choices[0]?.message?.content;

      if (assistantMessage) {
        setChatHistory((prevChat) => [
          ...prevChat,
          { role: 'assistant', content: assistantMessage },
        ]);
      } else {
        console.error("No content received from OpenAI.");
      }
    } catch (error) {
      console.error("Error fetching chat completion:", error);
    }

    setUserInput('');
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-screen-md bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <div className="text-4xl font-bold text-blue-800 mb-2">
            Chatbot Assistant
          </div>
          <p className="text-gray-600 text-lg">
            Welcome to the future of AI-powered assistance. Ask me anything!
          </p>
        </div>
        <div className="mb-4" style={{ height: "400px", overflow: 'auto' }}>
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`${
                message.role === 'user' ? 'text-left' : 'text-right'
              } mb-2`}
            >
              <div
                className={`max-w-md mx-4 my-2 inline-block ${
                  message.role === 'user'
                    ? 'bg-blue-100 text-black' // User text color set to black
                    : 'bg-green-300 text-black' // Assistant text color set to black
                } p-2 rounded-md`}
              >
                {message.role === 'user' ? 'H' : 'A'}
              </div>

              <div
                className={`max-w-md mx-4 my-2 inline-block ${
                  message.role === 'user'
                    ? 'bg-blue-100 text-black' // User input text set to black
                    : 'bg-green-100 text-black' // Assistant reply text set to black
                } p-2 rounded-md`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Ask me something..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-1 p-2 rounded-l-lg border text-black" // Set input text to black
          />
          {isLoading ? (
            <div className="bg-blue-500 text-white p-2 rounded-r-lg animate-pulse">
              Loading...
            </div>
          ) : (
            <button
              onClick={handleUserInput}
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
            >
              Ask
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
