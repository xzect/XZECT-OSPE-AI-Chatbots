"use client";
import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import { BsArrowReturnLeft } from "react-icons/bs";
// import { FaPlus } from "react-icons/fa";
import { Navbar } from "./components/navbar.jsx";
import AiResponse from "./components/aiResponse.jsx";
import {OptionalQuestion} from "./components/optionalQuestion.jsx";
import {Textform} from "./components/textform.jsx"

export default function Home() {

  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [usersubmit, setUsersubmit] = useState(false);
  const [storeQuestion, setStoreQuestion] = useState([]);
  const [selectedQuestion, setSlectedQuestion] = useState(null);
  const [userClick, setUserClick] = useState(false);
  

  const Question = [
    "Syntax Errors",
    "Logical Errors",
    " Debugging of code",
    "Reference Errors",
  ];

  const inputHandle = (e) => {
    setUserInput(e.target.value);
    setSlectedQuestion(null);
    setUserClick(true);
  };

  const optionalQhandler = (indx) => {
   setSlectedQuestion(Question[indx]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    aiResponse();
  };

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
  const aiResponse = async () => {
    if (userClick) {
      setStoreQuestion([...storeQuestion, userInput]);
    } else {
      setStoreQuestion([...storeQuestion, selectedQuestion]);
      setUserClick(true);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Coding Assistant : please Provides explanations and code examples for programming languages",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Coding Assistant, code prediction, Error detection and correction Code",
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const msg = (selectedQuestion !== null)? selectedQuestion : userInput;
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    setSlectedQuestion(null);
    setChatHistory([...chatHistory, text]);
    setUsersubmit(true);
  };

  useEffect(() => {
    //console.log(storeQuestion[0]);
    //console.log(selectedQuestion);
    if (selectedQuestion !== null) aiResponse();
  }, [selectedQuestion]);

  return (
    <>
      <Navbar />
      <div className="container h-screen relative mx-auto md:w-[44rem] sm:w-[100%] pt-20">
        {userClick ? (
          <>
            <AiResponse
              usersubmit={usersubmit}
              chatHistory={chatHistory}
              storeQuestion={storeQuestion}
            />
          </>
        ) : (
          <>
            <OptionalQuestion optionalQhandler={optionalQhandler} />
          </>
        )}
        
        <Textform
          inputHandle={inputHandle}
          handleSubmit={handleSubmit}
          userInput={userInput}
        />

      </div>
    </>
  );
}
