"use client";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRobot, faSpinner, faQuestionCircle, faCopy } from '@fortawesome/free-solid-svg-icons';
import bot from '../app/bot.png';

const predefinedProblems = {
  "What is diabetes?": {
    short: "Diabetes is a chronic condition characterized by high blood sugar levels.",
    long: "Diabetes is a chronic condition that affects how your body turns food into energy. Most of the food you eat is broken down into sugar (glucose) and released into your bloodstream. When your blood sugar goes up, it signals your pancreas to release insulin. Insulin acts like a key to let the blood sugar into your body’s cells for use as energy. With diabetes, your body doesn’t make enough insulin or can’t use it as well as it should."
  },
  "What are the symptoms of diabetes?": {
    short: "Common symptoms include frequent urination, excessive thirst, and extreme hunger.",
    long: "Symptoms of diabetes include increased thirst, frequent urination, extreme hunger, unexplained weight loss, presence of ketones in the urine (ketones are a byproduct of the breakdown of muscle and fat that happens when there's not enough available insulin), fatigue, irritability, blurred vision, slow-healing sores, and frequent infections, such as gums or skin infections and vaginal infections."
  },
  
  
};

const diabetesKeywords = [
  "diabetes", "blood sugar", "insulin", "glucose", "diabetic", "sugar levels", "type 1", "type 2", "gestational", "hyperglycemia", "hypoglycemia", "A1C", "metformin", "pancreas", "Vomiting", "sugar", "diabetes symptoms", "type 2 diabetes", "symptoms of diabetes", "gestational diabetes", "diabetic", "diabetes signs", "pregnancy diabetes", "short answer", "brief", "briefly answer", "short", "3 line", "3 lines", "2 line", "2 lines", "1 line", "1"
];

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }]);
    processMessage(inputValue);
    setInputValue('');
  };

  const isDiabetesRelated = (message) => {
    return diabetesKeywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  const processMessage = (message) => {
    if (isDiabetesRelated(message)) {
      const problem = predefinedProblems[message];
      if (problem) {
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: 'bot', message: problem.short, detailed: problem.long }
        ]);
      } else {
        sendMessage(message);
      }
    } else {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: 'bot', message: "Sorry, I can only provide information related to diabetes." }
      ]);
    }
  };

  const sendMessage = async (message) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`;
    const headers = { 'Content-Type': 'application/json' };
    const data = { contents: [{ parts: [{ text: message }] }] };
    setIsLoading(true);

    try {
      const response = await axios.post(url, data, { headers });
      if (response.data.candidates && response.data.candidates.length > 0) {
        const botMessage = response.data.candidates[0].content.parts[0].text;
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: 'bot', message: botMessage, detailed: null }
        ]);
      } else {
        throw new Error('No candidates in response');
      }
    } catch (error) {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: 'bot', message: `Sorry, something went wrong. Please try again. Error: ${error.message}` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question) => {
    const problem = predefinedProblems[question];
    if (problem) {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: 'bot', message: problem.short, detailed: problem.long }
      ]);
    }
  };

  const handleDetailedRequest = (detailedMessage) => {
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: 'bot', message: detailedMessage }
    ]);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Text copied to clipboard!");
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: 'black', color: 'white' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2em' }}>Diabetes Assistant Bot</h1>
      
      {}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.5em' }}>Common Questions</h2>
        {Object.keys(predefinedProblems).map((question, index) => (
          <div
            key={index}
            onClick={() => handleQuestionClick(question)}
            style={{
              cursor: 'pointer',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#333'
            }}
          >
            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginRight: '10px' }} />
            {question}
          </div>
        ))}
      </div>

      <div style={{ maxHeight: '400px', overflowY: 'scroll', marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        {chatLog.map((message, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start', margin: '10px 0' }}>
            {message.type === 'bot' && <FontAwesomeIcon icon={faRobot} style={{ marginRight: '10px', alignSelf: 'center' }} />}
            <span style={{ display: 'inline-block', padding: '10px', borderRadius: '5px', background: message.type === 'user' ? '#dcf8c6' : '#f1f1f1', color: 'black' }}>
              {message.message}
              {message.detailed && (
                <button onClick={() => handleDetailedRequest(message.detailed)} style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '5px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                  Tell me more
                </button>
              )}
              <button onClick={() => copyToClipboard(message.message)} style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '5px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </span>
            {message.type === 'user' && <FontAwesomeIcon icon={faUser} style={{ marginLeft: '10px', alignSelf: 'center' }} />}
          </div>
        ))}
        {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          className="text-gray-950"
          onChange={(e) => setInputValue(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', background: '#007bff', color: '#fff', cursor: 'pointer' }}>
          Send
        </button>
      </form>

      <footer style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#777' }}>
        © Himanshu Kumar - 2024
      </footer>
    </div>
  );
}
