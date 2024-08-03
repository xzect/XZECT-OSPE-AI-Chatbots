import MarkdownRenderer from "./MarkdownRenderer"

const Message: React.FC<{
  prompt: string
  result: string
}> = ({ prompt, result }) => {
  return (
    <div className="text-[16px] flex flex-col">
      <div className="bg-slate-900 w-[80%] text-white px-3 py-2 m-2 shadow-lg rounded-lg self-end">
        <MarkdownRenderer text={prompt} />
      </div>
      <div className="bg-slate-900/20 w-[80%] backdrop-blur text-slate-900 px-3 py-2 m-2 shadow-lg rounded-lg">
        <MarkdownRenderer text={result} />
      </div>
    </div>
  )
}

export default Message
