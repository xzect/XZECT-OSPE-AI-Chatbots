// Import the configureStore function from @reduxjs/toolkit
import { configureStore } from '@reduxjs/toolkit';
// Import the chat reducer from the chatSlice file
import chatReducer from './features/chatSlice';

// Configure and export the Redux store
export const store = configureStore({
  // Define the reducers for the store
  reducer: {
    // Associate the chat slice reducer with the 'chat' state key
    chat: chatReducer,
  },
});
