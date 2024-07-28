"use client";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [responses, setResponses] = useState([]);
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const responseEndRef = useRef(null);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const toggleIcon = () => {
    if(!isDarkMode){
      setIsDarkMode(true);
    }else{
      setIsDarkMode(false);
    }
  };

  const handleSubmit = async (question) => {
    setResponses(prevResponses => [...prevResponses, { question, response: 'Loading...' }]);
    setError(null);
    setIsSubmitted(true);
    setValue('');
  
    try {
      const res = await axios.post('./api/chat', { question});
      const responseData = res.data.response;
      setValue('');
      if (typeof responseData === 'string') {
        const paragraphs = responseData.split('\n').map((para, index) => (
          <p key={index}>{para}</p>
        ));
        setResponses(prevResponses => {
          const newResponses = [...prevResponses];
          newResponses[newResponses.length - 1].response = paragraphs;
          return newResponses;
        });
      } else {
        setError('Unexpected response format');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('An error occurred while fetching the response.');
      setResponses(prevResponses => {
        const newResponses = [...prevResponses];
        newResponses[newResponses.length - 1].response = '';
        return newResponses;
      });
    }
  };
  
  const handleQuestionClick = async (question) => {
    setValue(question);
    await handleSubmit(question);
  };

  const handleManualSubmit = async () => {
    await handleSubmit(value);
  };

  const handleNewChat = () => {
    setResponses([]);
    setValue('');
    setError(null);
    setIsSubmitted(false);
  };

  useEffect(() => {
    const questionItems = document.querySelectorAll('.question-item');
    const handleClick = (e) => {
      const question = e.target.innerText || e.target.closest('.question-item').innerText;
      handleQuestionClick(question);
    };

    questionItems.forEach(item => {
      item.addEventListener('click', handleClick);
    });

    return () => {
      questionItems.forEach(item => {
        item.removeEventListener('click', handleClick);
      });
    };
  }, []);

  useEffect(() => {
    if (responseEndRef.current) {
      responseEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [responses]);

  return (
    <main className="flex flex-col h-screen">
      <header className={`fixed top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b px-4 backdrop-blur-xl ${isDarkMode ? 'bg-black text-white dark:bg-zinc-950' : 'bg-gray-50'}`}>
            <div className="flex items-center">
                <h2 className="ml-2 text-sm font-medium  dark:text-zinc-200" href="#">Fishing Advisor</h2>
            </div>
            <div className="flex items-center justify-between p-4">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9" onClick={toggleIcon}>
              {!isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentcolor" className="size-4 transition-all">
                  <path d="M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0Zm72 88a64 64 0 1 1-64-64 64.07 64.07 0 0 1 64 64Zm-16 0a48 48 0 1 0-48 48 48.05 48.05 0 0 0 48-48ZM58.34 69.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32ZM192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72Zm5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8Zm80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8Zm112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16Z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentcolor" className="size-4 transition-all">
                  <path d="M233.54 142.23a8 8 0 0 0-8-2 88.08 88.08 0 0 1-109.8-109.8 8 8 0 0 0-10-10 104.84 104.84 0 0 0-52.91 37A104 104 0 0 0 136 224a103.09 103.09 0 0 0 62.52-20.88 104.84 104.84 0 0 0 37-52.91 8 8 0 0 0-1.98-7.98Zm-44.64 48.11A88 88 0 0 1 65.66 67.11a89 89 0 0 1 31.4-26A106 106 0 0 0 96 56a104.11 104.11 0 0 0 104 104 106 106 0 0 0 14.92-1.06 89 89 0 0 1-26.02 31.4Z"></path>
                </svg>
              )}
                <span className="sr-only">Toggle theme</span>
              </button>
            </div>
      </header>

      <div className={`flex-1 pt-16 ${isSubmitted ? 'hidden' : ''} ${isDarkMode ? 'bg-black text-white dark:bg-zinc-950' : 'bg-gray-100'}`}>
        <div className="relative flex h-full overflow-hidden">
          <div className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
            <div className="pb-[200px] pt-4 md:pt-10">
              <div className="mx-auto max-w-2xl px-4">
                <div className={`flex flex-col gap-2 rounded-lg border p-8  ${isDarkMode ? 'bg-black text-white dark:bg-zinc-950' : 'bg-white'}`}>
                  <h1 className="text-lg font-semibold">Welcome to Fishing Advisor!</h1>
                  <p className="text-muted-foreground leading-normal">This is an open source AI chatbot app for fishing related queries</p>
                </div>
              </div>
            </div>
            <div className="fixed inset-x-0 bottom-0 w-full">
              <div className="mx-auto lg:mb-40 sm:mb-60 mb-[140px] sm:max-w-2xl sm:px-4">
                <div id="questionList" className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
                  <div className={`question-item cursor-pointer rounded-lg border p-4 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${isDarkMode ? 'bg-black text-white dark:bg-zinc-950' : 'bg-white'}`}>
                    <div className="text-sm font-semibold">What are the best times to fish?</div>
                  </div>
                  <div className={`question-item cursor-pointer rounded-lg border p-4 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${isDarkMode ? 'bg-black text-white dark:bg-zinc-950' : 'bg-white'}`}>
                    <div className="text-sm font-semibold">What is the best fishing knot to use?</div>
                  </div>
                  <div className={`question-item cursor-pointer rounded-lg border p-4 dark:bg-zinc-950 dark:hover:bg-zinc-900 md:block ${isDarkMode ? 'bg-black text-white dark:bg-zinc-950' : 'bg-white'}`}>
                    <div className="text-sm font-semibold">How do I choose the right fishing rod and reel?</div>
                  </div>
                  <div className={`question-item cursor-pointer rounded-lg border p-4 dark:bg-zinc-950 dark:hover:bg-zinc-900 md:block ${isDarkMode ? 'bg-black text-white dark:bg-zinc-950' : 'bg-white'}`}>
                    <div className="text-sm font-semibold">How can I improve my casting accuracy?</div>
                  </div>
                  <div className={`question-item cursor-pointer rounded-lg border p-4 dark:bg-zinc-950 dark:hover:bg-zinc-900 md:block ${isDarkMode ? 'bg-black text-white dark:bg-zinc-950' : 'bg-white'}`}>
                    <div className="text-sm font-semibold">How do I handle and release fish safely?</div>
                  </div>
                  <div className={`question-item cursor-pointer rounded-lg border p-4 dark:bg-zinc-950 dark:hover:bg-zinc-900 md:block ${isDarkMode ? 'bg-black text-white dark:bg-zinc-950' : 'bg-white'}`}>
                    <div className="text-sm font-semibold">How do I find good fishing spots?</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSubmitted && (
        <div className={`flex-1 overflow-auto pb-[100px] mt-10 pt-4 md:pt-10 ${isDarkMode ? 'bg-[#202020] text-white dark:bg-zinc-950' : 'bg-gray-100'}`}>
          <div className={`mx-auto max-w-2xl px-4 h-full ${isDarkMode ? 'bg-black text-white dark:bg-zinc-950' : 'bg-white'}`}>
            <div className="h-full overflow-auto">
              {responses.map((res, index) => (
                <div key={index} className="mb-4">
                  <div className='mt-3'><strong>User: </strong>{res.question}</div>
                  <div className='mb-1'><strong>AI: </strong>{res.response}</div>
                </div>
              ))}
              {error && <p style={{ color: 'red' }}>Error: {error}</p>}
              <div ref={responseEndRef} />
            </div>
          </div>
        </div>
      )}
      
      <div className={`fixed bottom-2 inset-x-0 z-10 ${isDarkMode ? 'bg-black text-white dark:bg-zinc-950' : 'bg-gray-100'}`}>
        <div className={`mx-auto max-w-2xl px-4 py-2 shadow-md rounded-lg${isDarkMode ? 'bg-black text-white dark:bg-zinc-950' : 'bg-white'}`}>
          <form onSubmit={(e) => { e.preventDefault(); handleManualSubmit(); }}>
            <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden px-8 sm:rounded-md sm:border sm:px-12">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 bg-background absolute left-0 top-[13px] size-8 rounded-full p-0 sm:left-4" data-state="closed" 
                onClick={(e) => {e.preventDefault(); handleNewChat();}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentcolor" className="size-4">
                  <path d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z"></path>
                </svg>
                <span className="sr-only">New Chat</span>
              </button> 
              <textarea
                id="chatInput"
                value={value}
                onChange={onChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleManualSubmit();
                  }
                }}
                placeholder="Send a message."
                className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                spellCheck="true"
                autoComplete="off"
                autoCorrect="off"
                rows="1"
              />
              <div className="absolute right-0 top-[13px] sm:right-4">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-gray-500 text-white shadow hover:bg-primary/90 h-9 w-9" type="submit" disabled="">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="size-4">
                    <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z"></path>
                  </svg>
                  <span className="sr-only">Send message</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </main>
  );
};

export default Chatbot;
