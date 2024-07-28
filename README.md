Fishing-Advisor created by Harsh Pundir XZ/OSPE/2024/0637

Deployment Link : https://fishing-advisor.vercel.app

Documentation
1. Project Structure
Overview
This project is a fishing-themed AI chatbot application that uses Next.js for server-side rendering and React for the frontend.

Directory Layout
app/:
   components/:
     ChatInterface.js - Contains the main Chatbot component.
app/:
  api/:
    chat.js - API route for handling chatbot queries.
styles/ - Contains global CSS files.
globals.css - Global styles applied across the application.
next.config.mjs - Next.js configuration file.
tailwind.config.js - Tailwind CSS configuration file.


2. API Integrations
Cohere API
Endpoint: https://api.cohere.ai/generate
Method: POST
Headers:
Authorization: Bearer YOUR_COHERE_API_KEY
Content-Type: application/json
Request Body:
{
  "prompt": "Your question here",
  "max_tokens": 300
}
Response:
text: The AI-generated response to the prompt.
Environment Variables
COHERE_API_KEY: API key for accessing the Cohere API. Should be set in your .env file.


3. Deployment Steps

Initial Setup
Install Dependencies:
  npm install
Configure Environment Variables:
  Create a .env file in the root directory and add your API keys:
  COHERE_API_KEY=your_cohere_api_key

  
Build Process
Build the Application:
  npm run build

  
Deployment
Deploy to Vercel:
Push your code to a GitHub repository.
Link your repository to Vercel.
Add environmental variables.
Vercel will automatically build and deploy your application.
