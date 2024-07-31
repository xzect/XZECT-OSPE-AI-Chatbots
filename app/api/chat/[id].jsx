"use client";

import React from 'react';
import Image from "next/image";
import Markdown from 'react-markdown';

// This functional component represents a single chat message, 
// displaying the sender's avatar, name, and the message content.
const ChatMessage = ({ message, sender, image }) => {
  return (
    <section>
      <div className="flex items-start">
        {/* Display the sender's avatar using Next.js Image component */}
        <Image src={image} alt="" width={25} className="bg-black p-2 rounded-full mr-2" />

        {/* Message content wrapper */}
        <div className='mt-1'>
          {/* Display the sender's name */}
          <p className="uppercase text-slate-300 text-xs font-medium mb-2">{sender}</p>
          
          {/* Render the message content as Markdown, which allows for basic text formatting */}
          <Markdown className="text-sm md:text-md font-medium leading-7">{message}</Markdown>
        </div>
      </div>
      
      {/* A horizontal line to separate this message from others */}
      <hr className="w-5/6 opacity-10 m-auto my-4"></hr>
    </section>
  );
};

export default ChatMessage;
