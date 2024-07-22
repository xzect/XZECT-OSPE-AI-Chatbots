import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AuthProvider from "@/components/providers/AuthProvider"
import { Header, Sidebar } from "@/components"

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
        <body className={inter.className}>
          <div className="min-h-screen w-full bg-slate-400">
            <Header />
            <div className="h-full w-screen flex justify-center items-center">
              <Sidebar />
              <div className="flex-grow">{children}</div>
            </div>
          </div>
        </body>
      </AuthProvider>
    </html>
  )
}
