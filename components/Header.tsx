import React from "react"
import Button from "./UI/Button"

interface AiModals {
  value: string
  text: string
}

const Header = () => {
  const aiModals: AiModals[] = [
    { value: "flash", text: "Gemini 1.5 flash" },
    { value: "pro", text: "Gemini 1.5 pro" },
  ]
  const isLoggedIn = true

  return (
    <div className="w-full px-6 py-3 flex justify-between items-center bg-slate-900 text-white">
      <div className="">Menu logo</div>
      <div className="flex">
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
        {isLoggedIn ? (
          <Button btnText="Log Out" />
        ) : (
          <Button btnText="Log In" />
        )}
      </div>
    </div>
  )
}

export default Header
