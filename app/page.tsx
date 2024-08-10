"use client";

import { useState, useEffect, useMemo } from "react";
import * as dotenv from 'dotenv';

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} from "@google/generative-ai";

dotenv.config()

interface Message {
  text: string;
  role: string;
  timeStamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState<any>(null);
  const [theme, setTheme] = useState("light");
  const [error, setError] = useState<string>("");

  const API_KEY = String(process.env.GEMINI_API_KEY);
  const MODEL_NAME = "gemini-1.5-flash";

  const genAI = useMemo(() => new GoogleGenerativeAI(API_KEY), [API_KEY]);

  const generationConfig = useMemo(() => ({
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  }), []);

  const safetySettings = useMemo(() => [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ], []);

  useEffect(() => {
    const initChat = async () => {
      const newChat = await genAI
        .getGenerativeModel({ model: MODEL_NAME })
        .startChat({
          generationConfig,
          safetySettings,
          history: messages.map((msg) => ({
            parts: [{ text: msg.text }],
            role: msg.role,
          })),
        });
      setChat(newChat);
    };

    initChat();
  }, [messages, genAI, generationConfig, safetySettings]);

  const predefinedPrompts = [
    "What is the best exercise to lose weight fast?",
    "Give me motivation to stay consistent.",
    "How can I improve my overall health?",
    "Tell me about aerobics and its benefits."
  ];

  const handleSendMessage = async (message: string) => {
    const userMessage: Message = {
      text: message,
      role: "user",
      timeStamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput("");

    if (chat) {
      try {
        const result = await chat.sendMessage(message);
        const botMessage: Message = {
          text: result.response.text(),
          role: "model",
          timeStamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (err) {
        setError("Failed to get a response. Please try again.");
      }
    }
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const getThemeColours = () => {
    switch (theme) {
      case "light":
        return {
          primary: "bg-white",
          secondary: "bg-gray-100",
          accent: "bg-blue-500",
          text: "text-gray-800",
        };
      case "dark":
        return {
          primary: "bg-gray-900",
          secondary: "bg-gray-800",
          accent: "bg-yellow-500",
          text: "text-gray-100",
        };
      default:
        return {
          primary: "bg-white",
          secondary: "bg-gray-100",
          accent: "bg-blue-500",
          text: "text-gray-800",
        };
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage(userInput);
    }
  };

  const handlePredefinedPromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const { primary, secondary, accent, text } = getThemeColours();

  return (
    <div className={`flex flex-col h-screen p-4 ${primary}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className={`text-2xl font-bold ${text}`}>Personal Trainer Bot</h1>
        <div className="flex space-x-2">
          <label htmlFor="theme" className={`text-sm ${text}`}>
            Theme:
          </label>
          <select
            id="theme"
            value={theme}
            onChange={handleThemeChange}
            className={`p-1 rounded-md border ${text}`}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      <div className={`flex-1 overflow-y-auto ${secondary} rounded-md p-2`}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`p-2 rounded-lg ${
                msg.role === "user" ? `${accent} text-white` : `${primary} ${text}`
              }`}
            >
              {msg.text}
            </span>
            <p className={`text-xs ${text} mt-1`}>
              {msg.role === "model" ? "Bot" : "You"} -{" "}
              {msg.timeStamp.toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      
      <div className="flex flex-wrap justify-between mb-4">
        {predefinedPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handlePredefinedPromptClick(prompt)}
            className={`flex-1 m-1 p-2 rounded-md border ${accent} text-white hover:bg-opacity-80 focus:outline-none`}
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="flex items-center mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className={`flex-1 p-2 rounded-1-md border-t border-b border-l focus:outline-none focus:border-${accent}`}
        />
        <button
          onClick={() => handleSendMessage(userInput)}
          className={`p-2 ${accent} text-white rounded-r-md hover:bg-opacity-80 focus:outline-none`}
        >
          Send
        </button>
      </div>
    </div>
  );
}
