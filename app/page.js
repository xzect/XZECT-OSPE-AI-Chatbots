"use client";
import { useState, useEffect } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState(null);
  const [theme, setTheme] = useState("light");
  const [error, setError] = useState(null);

  const API_KEY = "AIzaSyBGJH7GzPHtiMMPRPgYZXb40rkk1GYNOZ4"; // Add your API key here
  const MODEL_NAME = "gemini-1.0-pro-001";

  const genAI = new GoogleGenerativeAI(API_KEY);

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAI
          .getGenerativeModel({ model: MODEL_NAME })
          .startChat({
            generationConfig,
            safetySettings,
            history: messages.map((msg) => ({
              text: msg.text,
              role: msg.role,
            })),
          });
        setChat(newChat);
      } catch (error) {
        setError("Failed to initialize chat. Please try again.");
      }
    };

    initChat();
  }, []);

  const handleSendMessage = async (message) => {
    try {
      const userMessage = {
        text: message,
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);

      if (chat) {
        const result = await chat.sendMessage(message);
        const botMessage = {
          text: result.response.text(),
          role: "bot",
          timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      setError("Failed to send message. Please try again");
    }
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const getThemeColors = () => {
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
          primary: "bg-dark",
          secondary: "bg-gray-100",
          accent: "bg-blue-500",
          text: "text-gray-800",
        };
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents adding a new line in the input field
      handleSendMessage(userInput);
      setUserInput("");
    }
  };

  const handlePromptClick = (prompt) => {
    setUserInput(prompt);
    handleSendMessage(prompt);
  };

  const { primary, secondary, accent, text } = getThemeColors();

  return (
    <div className={`flex flex-col h-screen p-4 ${primary}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className={`text-2xl font-bold ${text}`}>Water Conservation Chatbot</h1>
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
            className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"
              }`}
          >
            <span
              className={`p-2 rounded-lg ${msg.role === "user"
                  ? `${accent} text-black`
                  : `${primary} ${text} text-black`
                }`}
            >
              {msg.text}
            </span>
            <p className={`text-xs ${text} mt-1`}>
              {msg.role === "bot" ? "Bot" : "You"} -{" "}
              {msg.timestamp.toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <div className="flex items-center mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className={`flex-1 p-2 text-black rounded-l-md border-t border-b border-l border-${accent} focus:outline-none focus:border-${accent}`}
        />
        <button
          onClick={() => {
            handleSendMessage(userInput);
            setUserInput("");
          }}
          className={`p-2 ${accent} text-white rounded-r-md hover:bg-opacity-80 focus:outline-none`}
        >
          Send
        </button>
      </div>
      <div className="mt-4">
        <h2 className={`text-lg font-semibold ${text}`}>Common Questions:</h2>
        <ul className={`list-disc ml-4 mt-2 ${text}`}>
          <li className="cursor-pointer" onClick={() => handlePromptClick("What are some effective ways to conserve water at home?")}>
            What are some effective ways to conserve water at home?
          </li>
          <li className="cursor-pointer" onClick={() => handlePromptClick("How can I reduce water usage in my garden?")}>
            How can I reduce water usage in my garden?
          </li>
          <li className="cursor-pointer" onClick={() => handlePromptClick("What are the benefits of water conservation?")}>
            What are the benefits of water conservation?
          </li>
          <li className="cursor-pointer" onClick={() => handlePromptClick("How does water conservation help the environment?")}>
            How does water conservation help the environment?
          </li>
          <li className="cursor-pointer" onClick={() => handlePromptClick("What are some water-saving tips for daily use?")}>
            What are some water-saving tips for daily use?
          </li>
          <li className="cursor-pointer" onClick={() => handlePromptClick("How can I check for water leaks in my home?")}>
            How can I check for water leaks in my home?
          </li>
          <li className="cursor-pointer" onClick={() => handlePromptClick("What are the impacts of water scarcity?")}>
            What are the impacts of water scarcity?
          </li>
          <li className="cursor-pointer" onClick={() => handlePromptClick("How can industries conserve water?")}>
            How can industries conserve water?
          </li>
          <li className="cursor-pointer" onClick={() => handlePromptClick("What are some innovative water conservation technologies?")}>
            What are some innovative water conservation technologies?
          </li>
          <li className="cursor-pointer" onClick={() => handlePromptClick("How can I educate my community about water conservation?")}>
            How can I educate my community about water conservation?
          </li>
        </ul>
      </div>
    </div>
  );
}
