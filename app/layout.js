import { Inter } from "next/font/google";
import "./globals.css";
import Chatbot from "./components/ChatInterface";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chatbot",
  description: "Fishing AI Chatbot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={inter.className}>
      <div>
        <Chatbot />
      </div>
      {children}
    </body>
  </html>    
  );
}
