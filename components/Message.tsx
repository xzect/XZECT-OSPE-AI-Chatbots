const Message: React.FC<{
  prompt: string;
  result: string;
}> = ({ prompt, result }) => {
  return (
    <div className="text-[16px] flex flex-col">
      <div className="bg-slate-900 text-white px-3 py-2 m-2 shadow-lg rounded-lg self-end">
        {prompt}
      </div>
      <div className="bg-slate-900/20 backdrop-blur text-slate-900 px-3 py-2 m-2 shadow-lg rounded-lg">
        {result}
      </div>
    </div>
  );
};

export default Message;
