import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AuthProvider from "@/components/providers/AuthProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sales Assistant AI Chatbot",
  description:
    "AI-powered sales assistant chatbots using ChatGPT API integrated with Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`bg-slate-400 ${inter.className}`}>{children}</body>
      </AuthProvider>
    </html>
  )
}
