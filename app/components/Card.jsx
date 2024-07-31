import React from 'react'

// This functional component represents a card that serves as an introduction or welcome message
// for the FinChat application.
const Card = () => {
  return (
    <div className='bg-zinc-950 p-8 text-white rounded-md mb-8'>
      {/* The main heading of the card */}
      <h1 className='text-xl font-semibold mb-4 uppercase'>Welcome to FinChat a NextJS AI</h1>

      {/* The descriptive paragraph providing an overview of the services offered */}
      <p className='text-sm font-medium text-gray-400 leading-6'>
        Your personal finance assistant is here to help you manage your finances effectively. Ask me anything about budgeting, investments, savings, and more. Whether you&apos;re planning for retirement, looking to grow your investment portfolio, or simply trying to save more each month, I&apos;m here to provide personalized advice and guidance.
        <br></br> 
        Let&apos;s work together to achieve your financial goals and build a secure future. Don&apos;t hesitate to ask for tips, strategies, and insights to make informed financial decisions. Together, we can navigate the complexities of finance with confidence.
      </p>
    </div>
  )
}

export default Card
