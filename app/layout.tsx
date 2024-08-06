import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import { GeistMono } from "geist/font/mono";
import { Header, Sidebar } from "@/components";

export const metadata: Metadata = {
  title: "Sales Assistant AI Chatbot",
  description:
    "AI-powered sales assistant chatbots using ChatGPT API integrated with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`bg-slate-400 ${GeistMono.className}`}>
          <div className="min-h-screen w-screen flex flex-col bg-slate-400">
            <Header />
            <div className="h-full w-screen flex justify-stretch flex-grow">
              <Sidebar />
              <div className="flex-grow md:max-w-[80%]">{children}</div>
            </div>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
