"use client";
import { ChangeEvent, useState, useEffect } from 'react';
import InputForm from './component/inputForm';
import Messages from './component/messages';
import Header from './component/Header';
import { CustomMessage } from "./component/type"; // Adjust the import path as needed

const recipeKeywords = [
  "recipe", "cook", "make", "ingredients", "how to", "prepare", "dish", "meal", "bake", 
  "ingredient", "cooking", "recipe for", "method", "instructions", "dish for", "serve", 
  "food", "cuisine", "recipe guide", "recipe details", "cooking instructions" ,"biryani", "chicken", "make", "how to make biryani?"
];

export default function Home() {
  const [messages, setMessages] = useState<CustomMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);

  useEffect(() => {
    setWelcomeMessage("Welcome to Recipe AI Bot! 🥘\nFind recipes and cooking tips with ease using our Next.js and Google Generative AI-powered chatbot. Just ask for your favorite dish and get instant results!");

    const timer = setTimeout(() => {
      setWelcomeMessage(null);
    }, 8000); // Display for 8 seconds

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const isRecipeQuestion = (question: string) => {
    return recipeKeywords.some(keyword => question.toLowerCase().includes(keyword));
  };

  const handleSubmit = async (prompt: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // If input does not contain recipe-related keywords, send a default response
      if (!isRecipeQuestion(prompt)) {
        setMessages(prevMessages => [
          ...prevMessages,
          { id: Date.now().toString(), role: 'assistant', content: 'I am a recipe assistant. Please ask me about recipes or cooking instructions.' }
        ]);
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/genai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now().toString(), role: 'user', content: prompt },
        { id: Date.now().toString(), role: 'assistant', content: data.text }
      ]);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while fetching the response.');
    } finally {
      setIsLoading(false);
    }
  };

  const stop = () => {
    // Handle stopping of the loading spinner or process
  };

  return (
    <main className="flex flex-col min-h-screen p-8 bg-[#111827]">
      <Header />
      {welcomeMessage && (
        <div className="mb-4 p-4 bg-blue-100 text-blue-800 border border-blue-300 rounded">
          {welcomeMessage}
        </div>
      )}
      <Messages messages={messages} isLoading={isLoading} />
      <InputForm
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
        isLoading={isLoading}
        stop={stop}
      />
    </main>
  );
}






// "use client"; 11
// import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
// import InputForm from './component/inputForm';
// import Messages from './component/messages';

// import Header from './component/Header';

// const recipeKeywords = [
//   "recipe", "cook", "make", "ingredients", "how to", "prepare", "dish", "meal", "bake", 
//   "ingredient", "cooking", "recipe for", "method", "instructions", "dish for", "serve", 
//   "food", "cuisine", "recipe guide", "recipe details", "cooking instructions" ,"biryani", "chiken", ""
// ];

// export default function Home() {
//   const [messages, setMessages] = useState<Messages[]>([]);
//   const [input, setInput] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);

//   useEffect(() => {
//     setWelcomeMessage("Welcome to Recipe AI Bot! 🥘\nFind recipes and cooking tips with ease using our Next.js and Google Generative AI-powered chatbot. Just ask for your favorite dish and get instant results!");

//     const timer = setTimeout(() => {
//       setWelcomeMessage(null);
//     }, 8000); // Display for 5 seconds

//     return () => clearTimeout(timer); // Cleanup on component unmount
//   }, []);

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);
//   };

//   const isRecipeQuestion = (question: string) => {
//     return recipeKeywords.some(keyword => question.toLowerCase().includes(keyword));
//   };

//   const handleSubmit = async (prompt: string) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       // If input does not contain recipe-related keywords, send a default response
//       if (!isRecipeQuestion(prompt)) {
//         setMessages(prevMessages => [
//           ...prevMessages,
//           { role: 'assistant', content: 'I am a recipe assistant. Please ask me about recipes or cooking instructions.' }
//         ]);
//         setIsLoading(false);
//         return;
//       }

//       const response = await fetch('/api/genai', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok.");
//       }

//       const data = await response.json();
//       setMessages(prevMessages => [
//         ...prevMessages,
//         { role: 'user', content: prompt },
//         { role: 'assistant', content: data.text }
//       ]);
//     } catch (err) {
//       console.error('Error:', err);
//       setError('An error occurred while fetching the response.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const stop = () => {
//     // Handle stopping of the loading spinner or process
//   };

//   return (
//     <main className="flex flex-col min-h-screen p-8 bg-[#111827]">
//       <Header/>
//       {welcomeMessage && (
//         <div className="mb-4 p-4 bg-blue-100 text-blue-800 border border-blue-300 rounded">
//           {welcomeMessage}
//         </div>
//       )}
//       <Messages messages={messages} isLoading={isLoading}  />
//       <InputForm
//         handleInputChange={handleInputChange}
//         handleSubmit={handleSubmit}
//         input={input}
//         isLoading={isLoading}
//         stop={stop}
//       />
//     </main>
//   );
// }