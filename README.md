# IT Support Chatbot

This project is part of the XZECT-OSPE-AI-Chatbots repository, designed to provide basic IT support and troubleshooting tips through an AI-powered chatbot.

## Project Overview

The IT Support Chatbot is a specialized chatbot that assists users with common IT issues. It offers support for software, hardware, networking, and general IT-related queries. The chatbot leverages the Google Gemini model to provide clear and concise responses aimed at helping users troubleshoot and resolve their technical problems efficiently.

## Features

- **Common IT Issue Suggestions**: The chatbot suggests common IT issues that users might encounter, such as:

  - My computer is running slow
  - I can't connect to the internet
  - How do I reset my password?
  - My printer isn't working
  - How to update my software?
  - My browser is crashing?

- **Responsive Interface**: The chatbot is designed with a user-friendly interface that allows easy interaction with the AI model.

- **Real-time Assistance**: Users receive instant responses to their queries, enabling them to resolve issues quickly.

## Technologies Used

- **Next.js**: A React framework for building web applications.
- **Google Gemini**: AI model used for natural language understanding and response generation.
- **Shadcn**: UI components used for the frontend design.
- **Vercel AI SDK**: Integrates AI capabilities into the chatbot.

## Project Structure

- `src/app/api/chat/route.tsx`: Defines the backend logic for handling chat requests. It uses the Google Gemini model to generate responses.
- `src/components/chatbot.tsx`: Implements the chatbot interface, including handling user input, displaying messages, and suggesting common IT issues.

## Getting Started

### Prerequisites

- Node.js
- npm (preferred package manager for this project)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/P666R/XZECT-OSPE-AI-Chatbots.git
   ```

2. **Checkout to the `it-support` branch**:

   ```bash
   cd XZECT-OSPE-AI-Chatbots
   git checkout it-support
   ```

3. **Install dependencies**:

   ```bash
   npm install
   npm run dev
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   The application should be running at http://localhost:3000.
