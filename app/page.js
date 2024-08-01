
"use client";
import { useState, useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([
    "Create a workout plan",
    "Give me nutrition advice",
    "How to improve my running technique?",
    "Recommend exercises for core strength",
  ]);

  const messagesEndRef = useRef(null);

  const API_KEY = "AIzaSyC4tEyb4XB5S2Q2oDtqvbpw8l6Og5xvbDw"; // Replace with your actual API key
  const MODEL_NAME = "gemini-1.0-pro";

  useEffect(() => {
    const initModel = async () => {
      try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const newModel = genAI.getGenerativeModel({ model: MODEL_NAME });
        setModel(newModel);
        
        // Send initial message to set the context
        const result = await newModel.generateContent({
          contents: [{ role: "user", parts: [{ text: "You are now my personal fitness trainer. Provide advice and guidance related to fitness, nutrition, and health." }] }],
        });
        const response = await result.response;
        const text = response.text();
        
        setMessages([
          {
            role: "bot",
            text: "Hello! I'm your personal fitness trainer. How can I help you with your fitness goals today?",
          },
        ]);
      } catch (error) {
        console.error("Initialization error:", error);
        setError(`Failed to initialize: ${error.message}`);
      }
    };
    initModel();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    try {
      const userMessage = {
        text: userInput,
        role: "user",
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");

      if (model) {
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: userInput }] }],
        });
        const response = await result.response;
        const text = response.text();
        
        const botMessage = {
          text: text,
          role: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        // Use mock trainer if model is not initialized
        const botMessage = {
          text: mockTrainerResponse(userInput),
          role: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error("Message error:", error);
      setError(`Failed to send the message: ${error.message}`);
    }
  };

  const mockTrainerResponse = (input) => {
    if (input.toLowerCase().includes("workout")) {
      return "For a great workout, try combining cardio and strength training. Start with a 10-minute warm-up, then do 20 minutes of cardio like running or cycling, followed by 20 minutes of strength exercises like push-ups, squats, and lunges.";
    } else if (input.toLowerCase().includes("nutrition")) {
      return "A balanced diet is key to fitness. Aim for a mix of lean proteins, complex carbohydrates, and healthy fats. Don't forget to include plenty of fruits and vegetables for essential vitamins and minerals.";
    } else {
      return "As your fitness trainer, I'm here to help with workout plans, nutrition advice, and overall health guidance. Could you please be more specific about what you'd like help with?";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setUserInput(suggestion);
  };

  return (
    <div className={`flex flex-col h-screen bg-gray-100 ${inter.className}`}>
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800">Fitness Trainer AI</h1>
      </header>
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {error && <div className="text-red-500 text-sm p-2">{error}</div>}
        <div className="p-4 bg-white">
          <div className="flex space-x-2 mb-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask your fitness trainer..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              rows="1"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}