import React from 'react';
import Link from '../../../node_modules/next/link';


const Home = () => {
  return (
    <div className='text-white flex flex-col sm:gap-28 gap-20'>
      <div className='bg-slate-800 text-white p-5 rounded-lg text-justify'>
        <h1 className='font-bold sm:text-2xl'>Welcome to the Medical Research Assistant! Chatbot</h1>
        <p className='mt-4'>This is an open-source AI assistant designed to help you efficiently summarize and review medical research papers.</p>
        <p className='mt-4'>We hope this assistant enhances your research workflow and helps you gain insights more efficiently. Happy researching!</p>
      </div>
      <div className='p-4 flex flex-col gap-5'>
        <div className='sm:flex sm:flex-row flex flex-col gap-5'>
          <Link
          href={{
            pathname:'/chat',
            query:{
                messagefromquery:"How does gene editing impact future disease treatment and prevention?"
            }}
          }
            className='p-3 bg-slate-800 rounded-lg hover:cursor-pointer hover:bg-slate-600'
           
          >
            <h1 className='text-justify'>How does gene editing impact future disease treatment and prevention?</h1>
          </Link>
          <Link
          href={{
            pathname:'/chat',
            query:{
                messagefromquery:"What are the latest advancements in personalized medicine research?"
            }}
          }
            className='p-3 bg-slate-800 rounded-lg hover:cursor-pointer hover:bg-slate-600'
           
          >
            <h1 className='text-justify'>What are the latest advancements in personalized medicine research?</h1>
          </Link>
        </div>
        <div className='sm:flex sm:flex-row flex flex-col gap-5'>
        <Link
          href={{
            pathname:'/chat',
            query:{
                messagefromquery:"How is big data transforming patient care and research outcomes?"
            }}
          }
            className='p-3 bg-slate-800 rounded-lg hover:cursor-pointer hover:bg-slate-600'
           
          >
            <h1 className='text-justify'>How is big data transforming patient care and research outcomes?</h1>
          </Link>
          <Link
          href={{
            pathname:'/chat',
            query:{
                messagefromquery:"What ethical considerations arise in experimental drug testing?"
            }}
          }
            className='p-3 bg-slate-800 rounded-lg hover:cursor-pointer hover:bg-slate-600'
           
          >
            <h1 className='text-justify'>What ethical considerations arise in experimental drug testing?</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
