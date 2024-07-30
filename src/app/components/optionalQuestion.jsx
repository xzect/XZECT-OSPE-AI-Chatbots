"use client";
import React from "react";

export const OptionalQuestion = ({ optionalQhandler }) => {
  return (
    <>
    <div className="general_q_container relative">
      <div
        className="bg-[#09090B] p-8 sm:w-full rounded-lg border border-gray-800
               mb-2 hover:bg-black hover:shadow-md hover:shadow-black focus:outline-none "
      >
        <p className="text-white text-lg font-semibold pb-4 ">
          Welcome to AI Code Assistant Chatbot!
        </p>
        <p className="pb-2 text-zinc-400">
          This is an innovative tool designed to enhance and correct the code &
          provide better coding experience for developers.
        </p>
        <p className="text-zinc-400 ">
          Intelligent Code Suggestions, Code Generation Learning Mode this
          chatbot assists programmers in various ways, from answering coding
          queries to suggesting code snippets
        </p>
      </div>

      <div className="flex flex-row sm:ml-auto md:justify-between flex-wrap overflow-auto scrollbar max-h-[40vh] ">
        <div
          onClick={() => optionalQhandler(0)}
          className="bg-[#09090B] p-4 cursor-pointer rounded-lg border border-gray-800
                   mb-2 w-[348px] hover:bg-black hover:shadow-md hover:shadow-black focus:outline-none "
        >
          <p className=" text-white text-base font-semibold ">What are the</p>
          <p className="text-zinc-400">Syntax Errors in programming</p>
        </div>

        <div
          onClick={() => optionalQhandler(1)}
          className="bg-[#09090B] p-4 cursor-pointer rounded-lg border border-gray-800 
                  mb-2 w-[348px] hover:bg-black hover:shadow-md hover:shadow-black focus:outline-none "
        >
          <p className=" text-white text-base font-semibold ">What are the</p>
          <p className="text-zinc-400">Logical Errors in programming</p>
        </div>

        <div
          onClick={() => optionalQhandler(2)}
          className="bg-[#09090B] cursor-pointer p-4 rounded-lg border border-gray-800 
                  mb-2 w-[348px] hover:bg-black hover:shadow-md hover:shadow-black focus:outline-none "
        >
          <p className=" text-white text-base font-semibold ">What are the</p>
          <p className="text-zinc-400">debuging of code in programming</p>
        </div>

        <div
          onClick={() => optionalQhandler(3)}
          className="bg-[#09090B] cursor-pointer p-4 rounded-lg border border-gray-800 
                  mb-2 w-[348px] hover:bg-black hover:shadow-md hover:shadow-black focus:outline-none "
        >
          <p className=" text-white text-base font-semibold ">What are the</p>
          <p className="text-zinc-400">Reference Errors in programming</p>
        </div>
      </div>
    </div>
    </>
  );
};
