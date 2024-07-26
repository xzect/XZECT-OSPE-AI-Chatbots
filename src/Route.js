import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const predefinedPrompts = [
  "What is a balanced diet?",
  "How often should I exercise?",
  "Tell me some effective cardio exercises?",
  "How can I improve my sleep quality?"
];

const Route = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messageContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  const handleNewPrompt = async () => {
    const userMessageId = Date.now();
    const userMessage = { id: userMessageId, role: "user", content: input };

    setMessages(prevMessages => [...prevMessages, userMessage, { id: userMessageId + 1, role: "loading", content: "Loading..." }]);
    setInput(''); // Clear the input field after submission

    setTimeout(scrollToBottom, 100); // Add a small delay to ensure the new elements are rendered before scrolling

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);  // Replace with your actual API key
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const isValidPrompt = (prompt) => {
      const fitnessKeywords = ["diet", "exercise", "cardio", "sleep", "workout", "fitness", "abs", "legs", "yoga", "health"];
      return fitnessKeywords.some(keyword => prompt.toLowerCase().includes(keyword));
    };

    try {
      const result = await model.generateContent(input);
      const responseText = await result.response.text();

      const coachMessage = {
        id: userMessageId + 2,
        role: "assistant",
        content: isValidPrompt(input) ? responseText : "I am your fitness coach. I can assist you with all your fitness-related questions and provide you with the best workout routines and fitness tips."
      };

      setMessages(prevMessages => prevMessages.map(message =>
        message.id === userMessageId + 1 ? coachMessage : message
      ));
    } catch (error) {
      console.error("Error generating content:", error);
      setMessages(prevMessages => prevMessages.map(message =>
        message.id === userMessageId + 1 ? { id: userMessageId + 2, role: "assistant", content: "Error generating content. Please try again." } : message
      ));
    }
  };

  const handlePredefinedPromptClick = (prompt) => {
    setInput(prompt);
  };

  const handleSubmit = () => {
    handleNewPrompt();
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role === "user") {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-2">
      <div ref={messageContainerRef} className="w-full h-72 overflow-y-auto flex flex-col space-y-4 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "assistant" ? "justify-start" : message.role === "user" ? "justify-end" : "justify-center"}`}
          >
            {message.role === "loading" ? (
              <div className="flex justify-center items-center">
                <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className={`max-w-xs px-4 py-2 rounded-lg text-white flex items-center ${message.role === "assistant" ? "bg-gray-300" : "bg-blue-900"}`} style={{ wordBreak: 'break-word' }}>
               
                <p>{message.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 w-full">
        {predefinedPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handlePredefinedPromptClick(prompt)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
          >
            {prompt}
          </button>
        ))}
      </div>
      <div className="relative w-full">
        <input
          id='inp'
          type="text"
          placeholder='Enter prompt'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded-md pr-12"
        />
        <button
          id='btn'
          onClick={handleSubmit}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 7l6 6-6 6m12-6h9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Route;
