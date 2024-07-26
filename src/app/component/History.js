import React from 'react';

const History = ({ input }) => {
  return (
    <div className='bg-slate-800 min-w-4xl text-white p-4'>
      <h2>History</h2>
      <ul>
        {input?.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default History;
