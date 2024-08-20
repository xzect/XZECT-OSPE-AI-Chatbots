import Image from "next/image"

import chatbot from "@/assets/images/robot-profile.png"
import MarkdownRenderer from "./MarkdownRenderer"

const Message: React.FC<{
  prompt: string
  result: string
}> = ({ prompt, result }) => {
  return (
    <div className="text-[16px] flex flex-col my-2 font-semibold">
      <div className="flex justify-end items-end">
        <div className="bg-slate-900/90 w-fit max-w-[75%] text-white px-3 py-2 m-2 shadow-lg rounded-lg self-end">
          <MarkdownRenderer text={prompt} />
        </div>
        {/* ToDo: Chage this picture */}
        <Image
          src={chatbot}
          alt="user"
          height={50}
          className="bg-slate-900 rounded-full"
        />
      </div>
      <div className="flex justify-start items-end">
        <Image
          src={chatbot}
          alt="chatbot"
          height={50}
          className="bg-slate-900 rounded-full"
        />
        <div className="bg-slate-900/20 w-fit max-w-[75%] backdrop-blur text-slate-900 px-3 py-2 m-2 shadow-lg rounded-lg">
          <MarkdownRenderer text={result} />
        </div>
      </div>
    </div>
  )
}

export default Message
