"use client";
import { useChat, Message } from "ai/react";
import { useState } from "react";

export default function ChatComponent() {
    const { input, handleInputChange, handleSubmit, isLoading, messages, setInput } = useChat();

    const predefinedPrompts = [
        "What are the best practices for online security?",
        "How can I secure my home network?",
        "What should I do if I suspect a phishing attack?",
        "Can you explain what two-factor authentication is?",
        "How can I create strong passwords?",
        "What are the common types of cyber attacks?",
        "How can I protect my personal information online?",
        "What should I do if my accounts are hacked?"
    ];

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            {/* Predefined Prompts Section */}
            <div className="mb-6">
                {/* <h3 className="text-2xl font-bold text-gray-800 mb-4">Predefined Prompts</h3> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {predefinedPrompts.map((prompt, index) => (
                        <div
                            key={index}
                            className="cursor-pointer  text-gray-800 border-2 border-blue-500 p-4 rounded-lg hover:bg-blue-50 transition duration-300 ease-in-out"
                            onClick={() => setInput(prompt)}
                        >
                            {prompt}
                        </div>
                    ))}
                </div>
            </div>

            {/* Messages Section */}
            <div className="space-y-4 mb-6">
                {messages.map((message: Message) => (
                    <div key={message.id} className="bg-white  text-gray-800 p-4 rounded-lg shadow-sm">
                        <h4 className="text-lg font-semibold mb-2">
                            {message.role === "assistant" ? "Cybersecurity Advisor" : "User"}
                        </h4>
                        <div>
                            {message.content.split("\n").map((currentTextBlock: string, index: number) => (
                                currentTextBlock.trim() === "" ? (
                                    <p key={message.id + index}>&nbsp;</p>
                                ) : (
                                    <p key={message.id + index} className="text-gray-700">{currentTextBlock}</p>
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Form */}
            <form className="bg-gray-200 p-4 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <label htmlFor="user-message" className="block text-lg  text-gray-800 font-semibold mb-2">User Message</label>
                <textarea
                    id="user-message"
                    className="w-full bg-gray-100  text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                    placeholder={"What are the best practices for online security?"}
                    value={input}
                    onChange={handleInputChange}
                />
                <button className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out" type="submit">
                    Send Message
                </button>
            </form>
        </div>
    );
}
