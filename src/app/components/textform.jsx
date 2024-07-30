import React from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

export const Textform = ({ handleSubmit, inputHandle, userInput }) => {
  return (
    <>
      <div
        className="aigen w-full p-4 absolute bottom-0 bg-[#09090B]
         rounded-lg border border-gray-800 mt-4 hover:bg-black
          hover:shadow-md hover:shadow-black focus:outline-none "
      >
        <div
          className="px-4 flex justify-between items-center h-[4rem]
           rounded-md border border-gray-800 
           hover:bg-black hover:shadow-md hover:shadow-gray-800 focus:outline-none "
        >
          <form className="flex flex-row w-full">
            <label htmlFor="question">
              <div
                className="rounded-full flex items-center justify-center
                 border border-gray-800 w-[36px] h-[36px]
                 hover:bg-black hover:shadow-md hover:shadow-gray-800 focus:outline-none "
              >
                <FaPlus className="text-zinc-400" />
              </div>
            </label>

            <input
              type="text"
              id="question"
              className="w-[20rem] px-4 bg-transparent py-2 text-white border-none rounded-md focus:outline-none focus:border-zinc-500"
              placeholder="Type your message..."
              value={userInput}
              onChange={inputHandle}
            />

            <button
              className="w-[36px] flex h-[36px] items-center ml-auto justify-center  text-white bg-transparent rounded-lg border border-gray-800 hover:bg-zinc-600 focus:outline-none"
              type="submit"
              onClick={handleSubmit}
            >
              <BsArrowReturnLeft className=" font-md" />
            </button>
          </form>
        </div>
        <p className=" text-zinc-400 text-sm text-center pt-2">
          AI Chatbox build in Next.js
        </p>
      </div>
    </>
  );
};