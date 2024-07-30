require('dotenv').config();
import { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import TypingAnimation from "../components/TypingAnimation";
const inter = Inter({ subsets: ['latin'] })
console.log('HEllo');
const { GoogleGenerativeAI } = require("@google/generative-ai");


export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

   // Access your API key as an environment variable (see "Set up your API key" above)
   const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEYS);
   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
   const basePrompt=`You are an appointment scheduler.
        You have access to a list of appointments.
        You can schedule, view, list, delete, and add appointments.
        Respond to the user in a conversational and informative manner.
        Show the user the full list of appointments whenever asked.
        allocate numbers and proiority of appointment.
        Show the list in tabular form whenever ased by user to display the appointments.
        And most important thing store all the appointments and list whenever user demands
        And this is the base prompt which will be passed every time so focus on user message after this
        Only ask appointment info like Name,time ,date,Priority 
        `;
  useEffect(() => {
    const fetchData = async () => { 
      
      const result = await model.generateContent(basePrompt);
      const responses = await result.response;
      const texts = responses.text();
      console.log(texts);
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

    sendMessage(inputValue);
    
    setInputValue('');
  }

 
    async function sendMessage(message) {
      // const prompt = message;
      // const prompt = `${basePrompt}\nUser: ${message}`;
      prompt = `${basePrompt}\n${chatLog.map(entry => `${entry.message}`).join('\n')}\nUser: ${message}`;
      setIsLoading(true);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const textWithRemovedStars = text.replace(/\*/g, '');
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message:textWithRemovedStars}])
      setIsLoading(false);
      console.log(textWithRemovedStars);
    }
    
    function clickHandler1(){
    
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: 'Schedule an appointment' }])

    sendMessage('Schedule an appointment');
    
    setInputValue('');
    }
    function clickHandler2(){
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: 'What is the Format of Appointment?' }])

    sendMessage('What is the Format of Appointment?');
    
    setInputValue('');
    }
    function clickHandler3(){
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: 'How to Schedule an appointment?' }])

    sendMessage('How to Schedule an appointment?');
    
    setInputValue('');
    }
    function clickHandler4(){
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: 'Show me the list Of Appointments' }])

    sendMessage('Show me the list Of Appointments');
    
    setInputValue('');
    }
    function clickHandler5(){
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: 'Show the Appointment with Higher Priority' }])

    sendMessage('Show the Appointment with Higher Priority');
    
    setInputValue('');
    }
    function clickHandler6(){
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: 'Delete an Appointment' }])

    sendMessage('Delete an Appointment');
    
    setInputValue('');
    }
    function clickHandler7(){
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: 'Show the last Appointment' }])

    sendMessage('Show the last Appointment');
    
    setInputValue('');
    }
    function clickHandler8(){
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: 'Remove all Appointments' }])

    sendMessage('Remove all Appointments');
    
    setInputValue('');
    }


  return (
    <div className="container mx-auto max-w-[700px]">
      <div className="flex flex-col h-screen bg-gray-900 overflow-y-auto">
        <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-5xl">Appointment Scheduler</h1>
        <h1 className="text-center bg-purple-900 text-[30px]">Select a Prompt</h1>
        <div className="flex flex-wrap mt-5 mx-auto gap-2 p-2 w-full justify-center items-center">
          <button className="w-[47%] h-12 bg-purple-900 rounded-md hover:bg-purple-700 transition-all duration-1000" onClick={clickHandler1}>Schedule an appointment</button>
          <button className="w-[47%] h-12 bg-purple-900 rounded-md hover:bg-purple-700 transition-all duration-1000" onClick={clickHandler2}>What is the Format of Appointment?</button>
          <button className="w-[47%] h-12 bg-purple-900 rounded-md hover:bg-purple-700 transition-all duration-1000" onClick={clickHandler3}>How to Schedule an appointment?</button>
          <button className="w-[47%] h-12 bg-purple-900 rounded-md hover:bg-purple-700 transition-all duration-1000" onClick={clickHandler4}>Show me the list Of Appointments</button>
          <button className="w-[47%] h-12 bg-purple-900 rounded-md hover:bg-purple-700 transition-all duration-1000" onClick={clickHandler5}>Show the Appointment with Higher Priority</button>
          <button className="w-[47%] h-12 bg-purple-900 rounded-md hover:bg-purple-700 transition-all duration-1000" onClick={clickHandler6}>Delete an Appointment</button>
          <button className="w-[47%] h-12 bg-purple-900 rounded-md hover:bg-purple-700 transition-all duration-1000" onClick={clickHandler7}>Show the last Appointment</button>
          <button className="w-[47%] h-12 bg-purple-900 rounded-md hover:bg-purple-700 transition-all duration-1000" onClick={clickHandler8}>Remove all Appointments</button>
        </div>
        <div className="flex-grow p-6">
          <div className="flex flex-col space-y-4">
          {
        chatLog.map((message, index) => (
          <div key={index} className={`flex ${
            message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}>
            <div className={`${
              message.type === 'user' ? 'bg-purple-500' : 'bg-gray-800'
            } rounded-lg p-4 text-white max-w-sm`} style={{ whiteSpace: 'pre-wrap' }}>
            {message.message}
            </div>
            </div>
        ))
            }
            {
              isLoading &&
              <div key={chatLog.length} className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                    <TypingAnimation />
                  </div>
              </div>
            }
      </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-none p-6">
          <div className="flex rounded-lg border border-gray-700 bg-gray-800">  
        <input type="text" className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none" placeholder="Type your message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button type="submit" className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300">Send</button>
            </div>
        </form>
        </div>
    </div>
  )
}

  // const sendMessage = (message) => {
  //   const KEY=process.env.NEXT_PUBLIC_API_KEYS;
  //   const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${KEY}`;
  //   const data = 
  //     {
  //       "contents":[{"parts":[{"text":`${message}`}]}]
  //     };
  //     const headers = {
  //       'Content-type': 'application/json'
  //     };

  //   setIsLoading(true);

  //   axios.post(url, data,{ headers: headers }).then((response) => {
  //     console.log(response);
  //     setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message:response.data.candidates[0].content.parts[0].text}])
  //     setIsLoading(false);
  //   }).catch((error) => {
  //     setIsLoading(false);
  //     console.log(error);
  //   })
  // }
