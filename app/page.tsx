import { Header, Sidebar } from "@/components"
import { BiSend } from "react-icons/bi"

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-slate-400">
      <Header />
      <div className="h-full w-screen flex justify-center flex-grow">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <div className="flex-grow">
            <h1>Hello, World!</h1>
          </div>
          <div className="bg-slate-900 p-3">
            <div className="flex gap-2">
              <textarea
                name="prompt"
                id="prompt"
                placeholder="Enter your prompt"
                className="resize-none w-full bg-slate-400 rounded-lg flex-grow outline-none border-0 p-2"
              ></textarea>
              <button className="bg-blue-700 rounded-lg w-[80px] grid place-content-center">
                <BiSend size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
