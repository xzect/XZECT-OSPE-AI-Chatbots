Fishing-Advisor created by Harsh Pundir XZ/OSPE/2024/0637

Deployment Link : https://fishing-advisor.vercel.app

Documentation
1. Project Structure<br>
Overview<br>
This project is a fishing-themed AI chatbot application that uses Next.js for server-side rendering and React for the frontend.
<br>
Directory Layout<br>
app/:<br>
   components/:<br>
     ChatInterface.js - Contains the main Chatbot component.<br>
app/:<br>
  api/:<br>
    chat.js - API route for handling chatbot queries.<br>
styles/ - Contains global CSS files.<br>
globals.css - Global styles applied across the application.<br>
next.config.mjs - Next.js configuration file.<br>
tailwind.config.js - Tailwind CSS configuration file.<br>


2. API Integrations<br>
Cohere API<br>
Endpoint: https://api.cohere.ai/generate<br>
Method: POST<br>
Headers:<br>
Authorization: Bearer YOUR_COHERE_API_KEY<br>
Content-Type: application/json<br>
Request Body:<br>
{<br>
  "prompt": "Your question here",<br>
  "max_tokens": 300<br>
}<br>
Response:<br>
text: The AI-generated response to the prompt.<br>
Environment Variables<br>
COHERE_API_KEY: API key for accessing the Cohere API. Should be set in your .env file.<br>


3. Deployment Steps<br>

Initial Setup<br>
Install Dependencies:<br>
  npm install<br>
Configure Environment Variables:<br>
  Create a .env file in the root directory and add your API keys:<br>
  COHERE_API_KEY=your_cohere_api_key<br>

  
Build Process<br>
Build the Application:<br>
  npm run build<br>

  
Deployment<br>
Deploy to Vercel:<br>
Push your code to a GitHub repository.<br>
Link your repository to Vercel.<br>
Add environmental variables.<br>
Vercel will automatically build and deploy your application.<br>
