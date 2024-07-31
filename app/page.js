// "use client" directive allows for client-side rendering in a Next.js component
"use client"

// Import the Provider component from react-redux to connect the Redux store with React components
import { Provider } from 'react-redux';
// Import the configured Redux store
import { store } from '../app/store';
// Import the main ChatInterface component for the chat functionality
import ChatInterface from "./components/ChatInterface";
// Import the Navbar component for the navigation bar
import Navbar from './components/Navbar';

// The Home component serves as the root component for the application
export default function Home() {
  return (
    // Wrap the entire app with the Provider component to pass down the Redux store
    <Provider store={store}>
      <main>
        {/* Render the Navbar component at the top of the page */}
        <Navbar/>
        {/* Render the ChatInterface component for the chat functionality */}
        <ChatInterface/>
      </main>
    </Provider>
  );
}
