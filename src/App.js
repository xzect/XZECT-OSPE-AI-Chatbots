import './App.css';
import Route from './Route'

function App() {
  return (
  <div className="App w-full min-h-screen flex flex-col items-center">
      <head>
        <title>Fitness Coach Chatbot</title>
        <meta name="description" content="Fitness Coach Chatbot using Gemini API" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <main className="flex flex-col items-center w-full p-2">
        <div className='flex gap-2 p-2'>
          <img className='h-11 w-11' src='/chatbot.png'></img>
        <h1 className="text-3xl font-bold mt-2 text-blue-950 mb-6">
        Personal Fitness Advisor</h1>
        </div>
        
        <Route />
      </main>
    </div>
  );
}

export default App;
