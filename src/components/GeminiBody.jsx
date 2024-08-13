"use client";
import React, { useContext } from "react";
import {
  CircleUserRound ,Hammer ,Utensils ,Paintbrush ,Book ,Home ,Lightbulb ,Leaf ,DollarSign ,Shield ,TrendingUp, SendHorizontal
} from "lucide-react";
import { Context } from "@/context/ContextProvider";
const GeminiBody = () => {
  const {
    submit,
    recentPrompts,
    displayResult,
    loading,
    result,
    input,
    setInput,
    setRecentPrompts,
    prevPrompts,
    setPrevPrompts
  } = useContext(Context);
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);   // Set the input to the clicked suggestion
    setRecentPrompts(suggestion); // Set the recent prompt to the clicked suggestion
    setPrevPrompts([...prevPrompts, suggestion]);
    submit(suggestion);  // Trigger the submit action to get the answer

  };
  console.log(loading, "loading");
  return (
    <div className="flex-1 min-h-[100vh] pb-[15vh] relative">
      <div className="flex items-center justify-between p-5 text-xl text-gray-400">
        <p>Gemini</p>
        <CircleUserRound size={40} className="text-softTextColor" />
      </div>
      <div className="max-w-[900px] m-auto">
        {!displayResult ? (
            <>
            <div className="my-12 text-3xl font-medium pt-3">
              <p>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Welcome to NextJs Home-improvement Chatbot!</span>
              </p>
            </div>
            <p className="text-xl">I'm here to help you with any questions, concerns, or projects related to your home. Whether you're looking for tips on decorating, renovating, or simply finding the right products, I'm here to assist you.</p>
          <div className="grid grid-cols-5 gap-3 m-5">
            <div className="h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer"  onClick={() => handleSuggestionClick("What are some easy ways to update my home’s interior?")}>
              <p>What are some easy ways to update my home’s interior?</p>
              <Home size={35}
              className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"/>       
            </div>
            <div className="h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer" onClick={() => handleSuggestionClick("What are the best tools for a beginner DIY enthusiast?")}>
              <p>What are the best tools for a beginner DIY enthusiast?</p>
              <Hammer size={35}
              className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"/>
            </div>
            <div className="h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer" onClick={() => handleSuggestionClick("Can you recommend some budget-friendly home improvement projects?")}>
              <p>Can you recommend some budget-friendly home improvement projects?</p>
              <DollarSign size={35}
              className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"/>
            </div>
            <div className="h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer" onClick={() => handleSuggestionClick("How do I build a simple bookshelf?")}>
              <p>How do I build a simple bookshelf?</p>
              <Book size={35}
              className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"/>
            </div>
            <div className="h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer" onClick={() => handleSuggestionClick("How can I install outdoor lighting?")}>
              <p>How can I install outdoor lighting?</p>
              <Lightbulb size={35}
              className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"/>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3 m-5">
            <div className="h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer" onClick={() => handleSuggestionClick("What’s the average cost to remodel a kitchen?")}>
              <p>What’s the average cost to remodel a kitchen?</p>
              <Utensils size={35}
              className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"/>
            </div>
            <div className="h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer" onClick={() => handleSuggestionClick("Top home improvement trends for this year?")}>
              <p>Top home improvement trends for this year?</p>
              <TrendingUp size={35}
              className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"/>
            </div>
            <div className="h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer" onClick={() => handleSuggestionClick("What safety precautions should I take when using power tools?")}>
              <p>What safety precautions should I take when using power tools?</p>
              <Shield size={35}
              className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"/>
            </div>
            <div className="h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer" onClick={() => handleSuggestionClick("What are the best paint colors for a small room?")}>
              <p>What are the best paint colors for a small room?</p>
              <Paintbrush size={35}
              className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"/>
            </div>
            <div className="h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer" onClick={() => handleSuggestionClick("How do I prepare my home for the fall season?")}>
              <p>How do I prepare my home for the fall season?</p>
              <Leaf size={35}
              className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"/>
            </div>
          </div>
          </>
        ) : (
          <div className="result">
            <div className="my-10 flex items-center gap-5">
              <CircleUserRound size={40} className="text-softTextColor" />
              <p>{recentPrompts}</p>
            </div>
            <div className="flex items-start gap-5">
              <img src="/gemini.png" alt="" />
              <p
                className="text-md font-normal loading-6 text-gray-400"
                dangerouslySetInnerHTML={{ __html: result }}
              ></p>
            </div>
          </div>
        )}
        <div className="absolute bottom-0 w-full max-w-[900px] px-5 m-auto">
          <form action={submit}>
            <div className="flex items-center justify-between gap-5 bg-bgSecondaryColor py-2.5 px-5 rounded-full">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                className="flex-1 bg-transparent border-none outline-none p-2 text-md text-gray-400"
                placeholder="Enter a prompt here"
              />
              <div className="flex cursor-pointer">
                <SendHorizontal type="submit" size={20} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeminiBody;