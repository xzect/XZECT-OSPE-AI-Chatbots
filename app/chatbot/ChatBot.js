'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import Image from 'next/image';
import BotImage from '@/public/giphy.webp'
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);
  const predefinedPrompts = [
    "What could be causing my headache?",
    "Why do I have a sore throat?",
    "What are the symptoms of the flu?",
    "Why am I feeling dizzy?",
    "What can cause chest pain?",
    "Why do I have a fever?",
    "What are the symptoms of COVID-19?",
    "Why do I have stomach pain?",
    "What are common allergy symptoms?",
    "Why do I feel tired all the time?"
  ];

  const handleSendMessage = async () => {
    if (!input) return;
    const newMessages = [...messages, { type: 'user', text: input }];
    setMessages(newMessages);
    setLoading(true); 

    try {
      const response = await axios.post('/api/chat', { message: input });
      setMessages([...newMessages, { type: 'bot', text: response.data.reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false); 
    }

    setInput('');
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSendMessage();
      }
    };

    const textareaElement = textareaRef.current;
    if (textareaElement) {
      textareaElement.addEventListener('keypress', handleKeyPress);
    }

    return () => {
      if (textareaElement) {
        textareaElement.removeEventListener('keypress', handleKeyPress);
      }
    };
  }, [input]);

  const handlePromptClick = (prompt) => {
    setInput(prompt);
  };

  return (
    <>
    <div style={{ maxWidth: '1100px', margin: 'auto', padding: '2rem' }}>
    <h1 className="scroll-m-20 text-4xl text-white font-bold tracking-tight lg:text-5xl text-center">
      Symptom Checker Chatbot
    </h1>
      <div className='m-4'>
        <div className='flex justify-center items-center'>
        <Image 
        src={BotImage} 
        alt='bot-image'
        width={200}
        height={200}
        />
        </div>
        <h3 className="scroll-m-20 text-2xl text-white font-semibold tracking-tight"> Suggestions :</h3>
        <ul className="my-6 ml-6 list-disc flex flex-wrap">
        {predefinedPrompts.map((prompt, index) => (
            <li 
            key={index} 
            onClick={() => handlePromptClick(prompt)} 
            style={{ 
                cursor: 'pointer', 
                color: '#088088', 
                marginBottom: '0.5rem', 
                flex: '0 0 calc(50% - 1rem)',
                marginRight: '1rem' 
            }}
            >
            {prompt}
            </li>
        ))}
        </ul>

      </div>
      <div className='flex flex-row'>
      <Textarea
        ref={textareaRef} 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className='font-semibold'
      />
      <Button variant="outline" className="px-8 py-5 ml-6 border" onClick={handleSendMessage} >Send</Button>
      </div>
      <div className="border p-4 rounded-lg mt-4 h-96 w-full overflow-y-scroll text-black bg-slate-100 shadow-lg font-semibold font-mono">
        {messages.map((msg, index) => (
            <ChatMessage key={index} type={msg.type} text={msg.text} />
        ))}
        {loading && <div > <Loading /> </div>}
      </div>
    </div>
    </>
  );
};

export default ChatBot;
