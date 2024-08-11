import React from 'react';
import { Laptop } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-black text-white p-4 rounded-lg shadow-lg">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center">
          <Laptop className="w-8 h-8 mr-2" />
          <h1 className="text-xl font-bold">
            <span className="font-extrabold text-red-500">P666R</span> IT
            Support Assistant Chatbot
          </h1>
        </div>
      </div>
    </header>
  );
}
