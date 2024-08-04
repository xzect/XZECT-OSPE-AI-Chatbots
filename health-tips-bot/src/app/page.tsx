'use client';

import { useChat } from 'ai/react';
import Markdown from 'react-markdown';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  // Ye messages ekk  array hai jb eska lenth 0 ho tab suge
  return (
    <div className="flex flex-col w-full max-w-md h-screen mx-auto bg-gray-100">
    {/* Header */}
    <div className="flex items-center justify-between p-4 bg-blue-600 text-white shadow-lg rounded-t-lg">
      {/* <img src="/path/to/your/logo.png" alt="Logo" className="h-8" /> */}
      <h1 className="text-lg font-semibold">Health Tips Bot</h1>
    </div>
    
    {/* Messages Container */}
    <div className="flex flex-col flex-grow p-4 space-y-4 overflow-y-auto bg-white shadow-lg">
      {messages.map(m => (
        <div key={m.id} className={`whitespace-pre-wrap ${m.role === 'user' ? 'self-end text-right' : 'self-start text-left'}`}>
          <span className={`${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} rounded-xl px-4 py-2 inline-block`}>
            <Markdown>{m.content}</Markdown>
          </span>
        </div>
      ))}
    </div>
{/* Input Form */}
<form onSubmit={handleSubmit} className="flex items-center justify-between p-4 bg-white border-t border-gray-300 shadow-lg rounded-b-lg">
        <input
          className="flex-grow p-3 border border-gray-300 rounded-lg shadow-inner"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        
        />
        <button
          type="submit"
          className="p-3 ml-2 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 disabled:bg-gray-400"
        
        >
          Send
        </button>
      </form>
    </div>
  );
}
