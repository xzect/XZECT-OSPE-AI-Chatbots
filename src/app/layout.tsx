
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medical Research Chatbot",
  description: "Medical Research Chatbot",
  icons:{
    icon:['/favicon.ico?v=4']
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="http://localhost:3000/favicon.ico" />
      </head>
      
      <body className={inter.className}>
        <Navbar  />
        {children}
        
        </body>
    </html>
  );
}
