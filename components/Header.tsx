import { getServerSession } from "next-auth"
import { FiEdit } from "react-icons/fi"
import Button from "./UI/Button"
import authOptions from "@/app/api/auth/[...nextauth]/options"

interface AiModals {
  value: string
  text: string
}

const Header = async () => {
  const session = await getServerSession(authOptions)

  const aiModals: AiModals[] = [
    { value: "flash", text: "Gemini 1.5 flash" },
    { value: "pro", text: "Gemini 1.5 pro" },
  ]

  return (
    <div className="w-full px-6 py-3 flex justify-between items-center bg-slate-900 text-white">
      <div className="flex gap-4">
        <button className="hover:bg-slate-700 p-2 rounded" title="New chat">
          <FiEdit size={28} />
        </button>
        <div className="bg-slate-700 rounded-full py-2 px-3">
          <select
            name="modal"
            id="modal"
            className="bg-transparent outline-none border-0"
          >
            {aiModals.map(({ text, value }) => (
              <option
                key={value}
                value={value}
                className="bg-slate-600 border-0"
              >
                {text}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex">
        {session?.user ? (
          <Button btnText="Log Out" />
        ) : (
          <div className="flex gap-2">
            <Button btnText="Register" />
            <Button btnText="Log In" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
