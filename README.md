<h1 align="center">
  Riddler AI
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-message-square"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/></svg>
</h1>

<p align="center">
  <em>I'm <a href="https://riddler.amanraj.co">Riddler AI</a>, your friendly neighborhood puzzle solver! I'm here to crack codes, unravel mysteries, and make you think outside the box. Think of me as your personal Sherlock Holmes, but with a touch of wit and a whole lot of riddles. So, bring on the brain teasers, the cryptic clues, and the mind-bending puzzles! I'm ready to put my thinking cap on and help you find the answers.</em>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/cb39e49f-bddf-412d-ba01-86f67ff77c58" alt="Repository Thumbnail">
</p>

## 💻 Tech Stack

- **NextJS**
- **Tailwind CSS**
- **TypeScript**
- **Google Gemini**

### Core Packages and Libraries

- **Shadcn UI**: Used for building a responsive and modern UI. It provides a set of customizable components that are easy to integrate. [Shadcn UI Docs](https://ui.shadcn.com/docs)

- **react-markdown**: Allows rendering Markdown content within React components, making it easy to display formatted text dynamically. [react-markdown Docs](https://www.npmjs.com/package/react-markdown)

- **zod**: A TypeScript-first schema declaration and validation library. It ensures the data structures in the application are correct and safe. [zod Docs](https://zod.dev/?id=introduction)

- **lucide-react**: Provides a comprehensive set of icons in React, enabling a visually appealing interface with minimal effort. [Icons](https://lucide.dev/icons/)

- **Vercel AI SDK**: Integrates AI capabilities into the application, leveraging Vercel's powerful tools for building and deploying AI-powered features. [Vercel AI SDK Documentation](https://vercel.com/docs/ai)


## 🚀 Setup Locally

### Prerequisites

- **NodeJS**
- **Git**
- **Google Gemini API Key** - [Get your API key](https://ai.google.dev/gemini-api/docs)

### Steps

1. **Clone the project**

   ```bash
   git clone https://github.com/amanrajrana/Riddler.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd Riddler
   ```

3. **Setup environment variables**

   Copy all example environment variables from `.env.example` to `.env.local`.

   ```bash
   cp .env.example .env.local
   ```

   Set the following API key in the `.env.local` file:

   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=""
   ```

   Get your `GOOGLE_GENERATIVE_AI_API_KEY` from [Google API](https://makersuite.google.com/app/apikey).

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Start the app**

   ```bash
   npm run dev
   ```

## 📚 Authors

**Aman Raj Rana**

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/amanrajrana)
[![github](https://img.shields.io/badge/github-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/amanrajrana)
