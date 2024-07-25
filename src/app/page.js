"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Home from "./component/Home";


const ChatInterface = () => {
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigateToChat();
    }
  };


  const navigateToChat = () => {
    if (input.trim()) {
      const queryParams = new URLSearchParams({ messagefromquery: input }).toString();
      router.push(`/chat?${queryParams}`);
      setInput('');
    }
  };

  return (
    <>
   
    <div className="max-w-2xl mx-auto p-4 flex flex-col">
      <Home />
      <div className="sm:flex sm:flex-row flex flex-col sm:space-x-2 mt-4 gap-3">
        <input
          className="flex-1 p-2 border rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message here"
        />
        <button
          className="bg-white text-black font-bold px-4 py-2 rounded-lg hover:bg-black hover:text-white"
          onClick={navigateToChat}
        >
          Send
        </button>
      </div>
    </div>
    </>
  );
};

export default ChatInterface;
