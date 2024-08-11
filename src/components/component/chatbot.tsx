'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import Markdown from 'react-markdown';
import { SendIcon, SquareIcon, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Header } from './header';

const commonIssues = [
  'My computer is running slow',
  "I can't connect to the internet",
  'How do I reset my password?',
  "My printer isn't working",
  'How to update my software?',
  'How can I connect to a Wi-Fi network?',
];

export function Chatbot() {
  const [hideButtons, setHideButtons] = useState(false);
  const { messages, input, setInput, handleSubmit, isLoading, stop } = useChat({
    api: 'api/chat',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages]);

  const handleTopicClick = (topic: string) => {
    setInput(topic);
    setHideButtons(true);
    handleSubmit(new Event('submit') as any);
  };

  return (
    <div className="flex flex-col  justify-center w-full max-w-3xl mx-auto">
      <Header />
      <div
        className="flex flex-col w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ height: 'calc(100vh - 128px)' }}
      >
        <div
          className="flex-1 overflow-auto p-6 bg-white"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#CBD5E0 #F7FAFC' }}
        >
          {messages.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full">
              <Image src="/ai.png" alt="AI" width={80} height={80} />
              <p className="text-lg text-gray-600 mt-4 text-center">
                Welcome to your IT support chatbot! I am here to help you
                troubleshoot your IT problems. How can I assist you today?
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'assistant' ? 'items-start' : 'justify-end'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="p-2 bg-gray-200 rounded-full mr-2">
                      <Laptop className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.role === 'assistant'
                        ? 'bg-gray-100'
                        : 'bg-black text-white'
                    }`}
                  >
                    <Markdown className="text-sm">{message.content}</Markdown>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {!hideButtons && (
          <div className="p-4 bg-gray-100">
            <h2 className="text-sm font-semibold mb-2 text-gray-700">
              Common IT Issues:
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {commonIssues.map((issue, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left text-sm py-1 px-2 bg-white hover:bg-gray-100 text-gray-800 border-gray-300"
                  onClick={() => handleTopicClick(issue)}
                >
                  {issue}
                </Button>
              ))}
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            setHideButtons(true);
          }}
          className="bg-white p-4 flex items-center gap-2 border-t border-gray-200"
        >
          <div className="relative flex-1">
            <Textarea
              placeholder="Type your IT issue or question..."
              className="rounded-lg pr-12 min-h-[64px] border border-gray-300 w-full focus:ring-2 focus:ring-black focus:border-transparent"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <Button
                type={isLoading ? 'button' : 'submit'}
                size="icon"
                disabled={!input && !isLoading}
                onClick={isLoading ? stop : undefined}
                className="rounded-full bg-black hover:bg-gray-800 text-white"
              >
                {isLoading ? (
                  <SquareIcon className="w-5 h-5" />
                ) : (
                  <SendIcon className="w-5 h-5" />
                )}
                <span className="sr-only">{isLoading ? 'Stop' : 'Send'}</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
