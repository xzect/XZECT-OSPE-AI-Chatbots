import React from 'react';
import Markdown from './markdown'; // Ensure this component handles markdown rendering
import { Bot, User2 } from 'lucide-react';
import { CustomMessage } from './type'; // Adjust the path to your types file

type Props = {
  messages: CustomMessage[];
  isLoading: boolean;
};

const Messages = ({ messages, isLoading }: Props) => {
  return (
    <div
      id="chatbox"
      className=" flex flex-col-reverse w-full h-[calc(100vh-5rem)] overflow-y-auto p-4 text-left bg-[#111827] text-black"
    >
      {messages.map((m) => (
        <div
          key={m.id} // Use the unique ID for key
          className={`p-4 shadow-md rounded-md mb-2 ${
            m.role === 'user' ? 'bg-stone-300' : 'bg-blue-100'
          } relative`}
        >
          <Markdown text={m.content} />
          {m.role === 'user' ? (
            <User2 className="absolute -left-10 top-2 border rounded-full p-1 shadow-lg" />
          ) : (
            <Bot
              className={`absolute top-2 -left-10 border rounded-full p-1 shadow-lg stroke-[#0842A0] ${
                isLoading && m === messages[messages.length - 1] ? 'animate-bounce' : ''
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Messages;


// import React from 'react'; 11
// import Markdown from './markdown'; // Ensure this component handles markdown rendering
// import { Bot, User2 } from 'lucide-react';
// import { Message } from 'ai/react';

// type Props = {
//   messages: Message[];
//   isLoading: boolean;
// };

// const Messages = ({ messages, isLoading }: Props) => {
//   return (
//     <div
//       id="chatbox"
//       className=" mt-3 flex flex-col-reverse w-full h-[calc(100vh-5rem)] overflow-y-auto p-4 text-left bg-[#111827] text-black"
//     >
//       {messages.map((m, index) => (
//         <div
//           key={index}
//           className={`p-4 shadow-md rounded-md mb-2 ${
//             m.role === 'user' ? 'bg-stone-300' : 'bg-blue-100'
//           }`}
//         >
//           <Markdown text={m.content} />
//           {m.role === 'user' ? (
//             <User2 className="absolute -left-10 top-2 border rounded-full p-1 shadow-lg" />
//           ) : (
//             <Bot
//               className={`absolute top-2 -left-10 border rounded-full p-1 shadow-lg stroke-[#0842A0] ${
//                 isLoading && index === messages.length - 1 ? 'animate-bounce' : ''
//               }`}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Messages;
