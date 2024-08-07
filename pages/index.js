import { useEffect, useState, useRef, useCallback } from 'react';
import { saveAs } from 'file-saver';
import { resumePrompts } from '../utils/prompts';
import { gemini_model_call } from '../utils/gemini';

export default function Home() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi, I am Resume-Builder chatbot. Let's build your resume. First, tell me your name?",
      isBot: true,
    }
  ]);
  const [messageStore, setMessageStore] = useState([]);
  const [promptIndex, setPromptIndex] = useState(0);
  const [conversationList, setConversationList] = useState([]);
  const [generatedResume, setGeneratedResume] = useState(null);

  const handleSave = async () => {
    if (!Array.isArray(messageStore) || messageStore.length === 0) {
      alert('Invalid messageStore format or empty messageStore');
      return;
    }
  
    const prompt = "Give me a 3-word short description of the prompt as I want to save user prompt with that name only. Here is the prompt: " + (messageStore[0]?.response || '');
    // console.log('handleSave prompt:', prompt);
  
    try {
      const prompt_Generated = await gemini_model_call(prompt);
      // console.log('Generated Prompt:', prompt_Generated);
  
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messageStore, prompt_Generated })
      });
  
      const data = await response.json();
      // console.log('Save Response:', data);
  
      if (data.message === "Data inserted successfully!!!") {
        setConversationList(prevPromptText => [
          ...prevPromptText,
          { messageStore, prompt_Generated, conversation_id: data.data }
        ]);
      } else {
        alert('Failed to save conversation');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving conversation');
    }
  };
  
  

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/save', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const output = await response.json();
      // console.log("Fetched Data:", output);

      if (output.message === "User data processed successfully") {
        setConversationList(output.conversationData);
      } else {
        // console.log("Error in Fetching Data");
      }
    } catch (error) {
      console.error('Dashboard:', error.message);
    }
  }, []);

  const handleSend = async () => {
    if (input.trim() === "") return;
  
    const userInput = input.trim();
    setInput('');
  
    const newMessages = [
      ...messages,
      { text: userInput, isBot: false }
    ];
  
    const currentPrompt = resumePrompts[promptIndex];
  
    const newMessageStore = [
      ...messageStore,
      {
        prompt: currentPrompt,
        response: userInput
      }
    ];
  
    setMessages(newMessages);
    setMessageStore(newMessageStore);
  
    if (promptIndex + 1 < resumePrompts.length) {
      setPromptIndex(promptIndex + 1);
      setMessages([
        ...newMessages,
        { text: resumePrompts[promptIndex + 1], isBot: true }
      ]);
    } else {
      // Send entire conversation history to Gemini API
      try {
        // console.log("Message Store before API Call:", newMessageStore);
  
        const generatedResume = await gemini_model_call(newMessageStore);
  
        setGeneratedResume(generatedResume);
        setMessages([
          ...newMessages,
          { text: "Here is the best resume generated for you:", isBot: true },
          { text: generatedResume, isBot: true }
        ]);
      } catch (error) {
        console.error('Error:', error);
        setMessages([
          ...newMessages,
          { text: "Error generating resume. Please try again later.", isBot: true }
        ]);
      }
    }
  };
  
  

  const handleEnter = async (e) => {
    if (e.key === 'Enter') await handleSend();
  };

  const handleConversationClick = (conversation) => {
    // console.log("Conversation clicked:", conversation);
  
    // Assuming conversation.messageStore is an array of objects with 'user' and 'chatbot' fields
    const updatedMessages = [];
  
    // Iterate through the messageStore and add messages to updatedMessages
    conversation.messageStore.forEach(item => {
      if (item.chatbot) {
        updatedMessages.push({
          text: item.chatbot, // Bot response
          isBot: true
        });
      }
      if (item.user) {
        updatedMessages.push({
          text: item.user, // User message
          isBot: false
        });
      }
    });
  
    setMessageStore(conversation.messageStore || []);
    setMessages(updatedMessages);
  };

  const handleDownload = () => {
    const fileContent = messageStore.length > 0 ? messageStore : messages;
    const blob = new Blob([JSON.stringify(fileContent, null, 2)], { type: 'application/json' });
    saveAs(blob, 'conversation.json');
  };

  useEffect(() => {
    fetchData();
    if (msgEnd.current) {
      msgEnd.current.scrollIntoView();
    }
  }, [messages, fetchData]);

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src='/chatbot.png' alt="gptlogo" className="chatImg" />
            <span className="brand">AI INTERACT</span>
          </div>
          <button className="midBtn btn btn-primary" onClick={() => { window.location.reload() }}>
            <img src='/add-30.png' alt="new Chat" className="addBtn" />New Chat
          </button>
          <div className='prompt_Section'>
            {conversationList.length > 0 && (
              <div className='Prompt'>
                {conversationList.map((conversation) => (
                  <div
                    className='Prompt'
                    key={conversation.conversation_id}
                    onClick={() => handleConversationClick(conversation)}
                    style={{ cursor: 'pointer' }}
                  >
                    {conversation.prompt_Generated}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lowerside">
          {messageStore.length === 0 ? (
            <div>
              <button type="button" className="btn btn-success listItems" onClick={handleSave}>Save Current Conversation</button>
              <button type="button" className="btn btn-success listItems download" onClick={handleDownload}>Download Conversation</button>
            </div>
          ) : (
            <div>
            {/* <button type="button" className="btn btn-success listItems" onClick={handleSave}>Save Current Conversation</button> */}
            <button type="button" className="btn btn-success listItems download" onClick={handleDownload}>Download Conversation</button>
            </div>
          )}
        </div>
      </div>

      <div className="main">
        <div className="chats">
          {messages.map((message, i) =>
            <div key={i} className={message.isBot ? "chat bot" : "chat"} >
              <img className="chatImg" src={message.isBot ? '/chatbot.png' : '/user_icon1.png'} alt="userIcon" />
              <p className="txt">{message.text}</p>
            </div>
          )}
          <div ref={msgEnd} />
        </div>

        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder='Send a message'
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => { setInput(e.target.value) }}
            />
            <button className='send' onClick={handleSend}>
              <img src='/send.svg' alt="send" />
            </button>
          </div>
          <p>AI INTERACT may produce incorrect results</p>
        </div>
      </div>
    </div>
  );
}
