// // "use client";
// // import { useState, useEffect } from "react";
// // import {
// //   GoogleGenerativeAI,
// //   HarmCategory,
// //   HarmBlockThreshold,
// // } from "@google/generative-ai";

// // export default function Home() {
// //   const [messages, setMessages] = useState([]);
// //   const [userInput, setUserInput] = useState("");
// //   const [chat, setChat] = useState(null);
// //   const [theme, setTheme] = useState("light");
// //   const [error, setError] = useState(null);
// //   const [challenges, setChallenges] = useState([]);

// //   const API_KEY = "AIzaSyC4tEyb4XB5S2Q2oDtqvbpw8l6Og5xvbDw";
// //   const MODEL_NAME = "gemini-1.0-pro-001";

// //   const genAI = new GoogleGenerativeAI(API_KEY);

// //   const generationConfig = {
// //     temperature: 0.9,
// //     topK: 1,
// //     topP: 1,
// //     maxOutputTokens: 2048,
// //   };

// //   const safetySettings = [
// //     {
// //       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
// //       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
// //     },
// //     {
// //       category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
// //       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
// //     },
// //     {
// //       category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
// //       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
// //     },
// //     {
// //       category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
// //       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
// //     },
// //   ];

// //   useEffect(() => {
// //     const initChat = async () => {
// //       try {
// //         const newChat = await genAI
// //           .getGenerativeModel({ model: MODEL_NAME })
// //           .startChat({
// //             generationConfig,
// //             safetySettings,
// //             history: messages.map((msg) => ({
// //               text: msg.text,
// //               role: msg.role,
// //             })),
// //           });
// //         setChat(newChat);
// //       } catch (error) {
// //         setError("Failed to initialize, please try again.");
// //       }
// //     };
// //     initChat();
// //   }, []);

// //   const handleSendMessage = async () => {
// //     try {
// //       const userMessage = {
// //         text: userInput,
// //         role: "user",
// //         timestamp: new Date(),
// //       };
// //       setMessages((prevMessages) => [...prevMessages, userMessage]);
// //       setUserInput("");

// //       if (chat) {
// //         const result = await chat.sendMessage(userInput);
// //         const botMessage = {
// //           text: result.response.text(),
// //           role: "bot",
// //           timestamp: new Date(),
// //         };
// //         setMessages((prevMessages) => [...prevMessages, botMessage]);

// //         handleFitnessCommand(userInput);
// //       }
// //     } catch (error) {
// //       setError("Failed to send the message.");
// //     }
// //   };

// //   const handleFitnessCommand = (command) => {
// //     if (command.toLowerCase().includes("create challenge")) {
// //       createChallenge(command);
// //     } else if (command.toLowerCase().includes("track progress")) {
// //       trackProgress(command);
// //     } else if (command.toLowerCase().includes("update progress")) {
// //       updateProgress(command);
// //     } else if (command.toLowerCase().includes("view challenges")) {
// //       viewChallenges();
// //     } else if (command.toLowerCase().includes("delete challenge")) {
// //       deleteChallenge(command);
// //     }
// //   };

// //   const createChallenge = (command) => {
// //     const challengeName = command.split("create challenge")[1].trim();
// //     const newChallenge = {
// //       name: challengeName,
// //       progress: 0,
// //     };
// //     setChallenges((prevChallenges) => [...prevChallenges, newChallenge]);
// //     setMessages((prevMessages) => [
// //       ...prevMessages,
// //       { text: `Challenge "${challengeName}" created!`, role: "bot", timestamp: new Date() },
// //     ]);
// //   };

// //   const trackProgress = (command) => {
// //     const challengeName = command.split("track progress")[1].trim();
// //     const challenge = challenges.find((ch) => ch.name === challengeName);
// //     if (challenge) {
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { text: `Progress for "${challengeName}": ${challenge.progress}%`, role: "bot", timestamp: new Date() },
// //       ]);
// //     } else {
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { text: `Challenge "${challengeName}" not found.`, role: "bot", timestamp: new Date() },
// //       ]);
// //     }
// //   };

// //   const updateProgress = (command) => {
// //     const [_, challengeName, progress] = command.split("update progress")[1].trim().split(" ");
// //     const challengeIndex = challenges.findIndex((ch) => ch.name === challengeName);
// //     if (challengeIndex !== -1) {
// //       const updatedChallenges = [...challenges];
// //       updatedChallenges[challengeIndex].progress = parseInt(progress, 10);
// //       setChallenges(updatedChallenges);
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { text: `Updated progress for "${challengeName}" to ${progress}%`, role: "bot", timestamp: new Date() },
// //       ]);
// //     } else {
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { text: `Challenge "${challengeName}" not found.`, role: "bot", timestamp: new Date() },
// //       ]);
// //     }
// //   };

// //   const viewChallenges = () => {
// //     if (challenges.length > 0) {
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         {
// //           text: `Challenges: ${challenges.map((ch) => `${ch.name} (${ch.progress}%)`).join(", ")}`,
// //           role: "bot",
// //           timestamp: new Date(),
// //         },
// //       ]);
// //     } else {
// //       setMessages((prevMessages) => [
// //         ...prevMessages,
// //         { text: "No challenges found.", role: "bot", timestamp: new Date() },
// //       ]);
// //     }
// //   };

// //   const deleteChallenge = (command) => {
// //     const challengeName = command.split("delete challenge")[1].trim();
// //     const updatedChallenges = challenges.filter((ch) => ch.name !== challengeName);
// //     setChallenges(updatedChallenges);
// //     setMessages((prevMessages) => [
// //       ...prevMessages,
// //       { text: `Challenge "${challengeName}" deleted.`, role: "bot", timestamp: new Date() },
// //     ]);
// //   };

// //   const handleThemeChange = (e) => {
// //     setTheme(e.target.value);
// //   };

// //   const getThemeColors = () => {
// //     switch (theme) {
// //       case "light":
// //         return {
// //           primary: "bg-white",
// //           secondary: "bg-gray-100",
// //           accent: "bg-blue-500",
// //           text: "text-gray-800",
// //         };
// //       case "dark":
// //         return {
// //           primary: "bg-gray-900",
// //           secondary: "bg-gray-800",
// //           accent: "bg-yellow-500",
// //           text: "text-gray-100",
// //         };
// //       default:
// //         return {
// //           primary: "bg-white",
// //           secondary: "bg-gray-100",
// //           accent: "bg-blue-500",
// //           text: "text-gray-800",
// //         };
// //     }
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter") {
// //       e.preventDefault();
// //       handleSendMessage();
// //     }
// //   };

// //   const { primary, secondary, accent, text } = getThemeColors();

// //   return (
// //     <div className={`flex h-screen ${primary}`}>
// //       <aside className="w-1/4 p-4 bg-gray-800 text-white">
// //         <h2 className="text-xl font-bold mb-4">Fitness Bot</h2>
// //         <nav>
// //           <ul>
// //             <li className="mb-2">
// //               <button
// //                 className={`w-full text-left p-2 rounded-md ${text} text-white `}
// //                 onClick={() => setUserInput("create challenge")}
// //               >
// //                 Create Challenge
// //               </button>
// //             </li>
// //             <li className="mb-2">
// //               <button
// //                 className={`w-full text-left p-2 rounded-md ${text} text-white`}
// //                 onClick={() => setUserInput("track progress")}
// //               >
// //                 Track Progress
// //               </button>
// //             </li>
// //             <li className="mb-2">
// //               <button
// //                 className={`w-full text-left p-2 rounded-md ${text} text-white`}
// //                 onClick={() => setUserInput("update progress")}
// //               >
// //                 Update Progress
// //               </button>
// //             </li>
// //             <li className="mb-2">
// //               <button
// //                 className={`w-full text-left p-2 rounded-md ${text} text-white`}
// //                 onClick={() => setUserInput("view challenges")}
// //               >
// //                 View Challenges
// //               </button>
// //             </li>
// //             <li className="mb-2">
// //               <button
// //                 className={`w-full text-left p-2 rounded-md ${text} text-white`}
// //                 onClick={() => setUserInput("delete challenge")}
// //               >
// //                 Delete Challenge
// //               </button>
// //             </li>
// //           </ul>
// //         </nav>
// //       </aside>
// //       <main className={`flex-1 flex flex-col p-4 ${secondary}`}>
// //         <header className="flex justify-between items-center mb-4">
// //           <h1 className={`text-2xl font-bold ${text}`}>Fitness Challenge Bot</h1>
// //           <div className="flex space-x-2">
// //             <label htmlFor="theme" className={`text-sm ${text}`}>
// //               Theme:
// //             </label>
// //             <select
// //               id="theme"
// //               value={theme}
// //               onChange={handleThemeChange}
// //               className={`p-1 rounded-md border ${text}`}
// //             >
// //               <option value="light">Light</option>
// //               <option value="dark">Dark</option>
// //             </select>
// //           </div>
// //         </header>
// //         <div className={`flex-1 overflow-y-auto p-2 rounded-md ${primary}`}>
// //           {messages.map((msg, index) => (
// //             <div
// //               key={index}
// //               className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}
// //             >
// //               <span
// //                 className={`p-2 rounded-lg ${
// //                   msg.role === "user" ? `${accent} text-white` : `${primary} ${text}`
// //                 }`}
// //               >
// //                 {msg.text}
// //               </span>
// //               <p className={`text-xs ${text} mt-1`}>
// //                 {msg.role === "bot" ? "Bot" : "You"} -{" "}
// //                 {new Date(msg.timestamp).toLocaleTimeString()}
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //         {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
// //         <div className="flex items-center mt-4">
// //           <input
// //             type="text"
// //             placeholder="Type your message..."
// //             value={userInput}
// //             onChange={(e) => setUserInput(e.target.value)}
// //             onKeyDown={handleKeyPress}
// //             className={`flex-1 p-2 rounded-l-md border-t border-b border-l focus:outline-none focus:border-${accent} text-black`}
// //           />
// //           <button
// //             onClick={handleSendMessage}
// //             className={`p-2 ${accent} text-white rounded-r-md hover:bg-opacity-80 focus:outline-none`}
// //           >
// //             Send
// //           </button>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
// "use client";
// import { useState, useEffect, useRef } from "react";
// import { Inter } from "next/font/google";
// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai";

// const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [chat, setChat] = useState(null);
//   const [error, setError] = useState(null);
//   const [suggestions, setSuggestions] = useState([
//     "Create a workout plan",
//     "Give me nutrition advice",
//     "How to improve my running technique?",
//     "Recommend exercises for core strength",
//   ]);

//   const messagesEndRef = useRef(null);

//   const API_KEY = "AIzaSyC4tEyb4XB5S2Q2oDtqvbpw8l6Og5xvbDw";
//   const MODEL_NAME = "gemini-1.0-pro-001";

//   const genAI = new GoogleGenerativeAI(API_KEY);

//   const generationConfig = {
//     temperature: 0.7,
//     topK: 1,
//     topP: 1,
//     maxOutputTokens: 2048,
//   };

//   const safetySettings = [
//     {
//       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//   ];

//   useEffect(() => {
//     const initChat = async () => {
//       try {
//         const newChat = await genAI
//           .getGenerativeModel({ model: MODEL_NAME })
//           .startChat({
//             generationConfig,
//             safetySettings,
//             history: [
//               {
//                 role: "user",
//                 text: "You are now my personal fitness trainer. Provide advice and guidance related to fitness, nutrition, and health.",
//               },
//               {
//                 role: "model",
//                 text: "Understood! I'm now your personal fitness trainer. I'm here to help you with all aspects of your fitness journey, including workout plans, nutrition advice, exercise techniques, and overall health guidance. How can I assist you today?",
//               },
//             ],
//           });
//         setChat(newChat);
//         setMessages([
//           {
//             role: "bot",
//             text: "Hello! I'm your personal fitness trainer. How can I help you with your fitness goals today?",
//           },
//         ]);
//       } catch (error) {
//         setError("Failed to initialize, please try again.");
//       }
//     };
//     initChat();
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!userInput.trim()) return;

//     try {
//       const userMessage = {
//         text: userInput,
//         role: "user",
//       };
//       setMessages((prevMessages) => [...prevMessages, userMessage]);
//       setUserInput("");

//       if (chat) {
//         const result = await chat.sendMessage(userInput);
//         const botMessage = {
//           text: result.response.text(),
//           role: "bot",
//         };
//         setMessages((prevMessages) => [...prevMessages, botMessage]);
//       }
//     } catch (error) {
//       setError("Failed to send the message.");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setUserInput(suggestion);
//   };

//   return (
//     <div className={`flex flex-col h-screen bg-gray-100 ${inter.className}`}>
//       <header className="bg-white shadow-sm p-4">
//         <h1 className="text-2xl font-bold text-gray-800">Fitness Trainer AI</h1>
//       </header>
//       <main className="flex-1 overflow-hidden flex flex-col">
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${
//                 msg.role === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-[70%] p-3 rounded-lg ${
//                   msg.role === "user"
//                     ? "bg-blue-500 text-white"
//                     : "bg-white text-gray-800"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//         {error && <div className="text-red-500 text-sm p-2">{error}</div>}
//         <div className="p-4 bg-white">
//           <div className="flex space-x-2 mb-2">
//             {suggestions.map((suggestion, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleSuggestionClick(suggestion)}
//                 className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300"
//               >
//                 {suggestion}
//               </button>
//             ))}
//           </div>
//           <div className="flex items-center space-x-2">
//             <textarea
//               value={userInput}
//               onChange={(e) => setUserInput(e.target.value)}
//               onKeyDown={handleKeyPress}
//               placeholder="Ask your fitness trainer..."
//               className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows="1"
//             />
//             <button
//               onClick={handleSendMessage}
//               className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
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
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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