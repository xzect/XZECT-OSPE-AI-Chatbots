import React from 'react';
import Image from 'next/image'; 

function Header() {
  return (
    <div className="flex flex-col items-center justify-center my-4 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex items-center space-x-2 flex-wrap justify-center">
        <Image 
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28" // Responsive sizes
          src="/assets/pizza.png" 
          alt="Recipe AI Icon" 
          width={112} 
          height={112} 
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-700">
          Recipe AI Bot
        </h1>
      </div>
    </div>
  );
}

export default Header;
