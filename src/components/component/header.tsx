import React from 'react';
import { Laptop } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gray-700 text-white p-4">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center">
          <Laptop className="w-8 h-8 mr-2" />
          <h1 className="text-xl font-bold">IT Support Assistant</h1>
        </div>
      </div>
    </header>
  );
}
