"use client"

import { IoClose } from "react-icons/io5"
import Button from "./UI/Button"
import { useRouter } from "next/navigation"

interface ModalProps {
  title?: string
  body?: React.ReactElement
  buttonLabel?: string
  footerLabel?: React.ReactElement
  onSubmit?: (e: any) => void
  errorMessage?: string | null
}

const Modal = ({
  title,
  body,
  buttonLabel,
  footerLabel,
  onSubmit,
  errorMessage,
}: ModalProps) => {
  const router = useRouter()
  return (
    <div className="absolute inset-0 backdrop-blur-sm">
      <div className="w-[500px] bg-slate-200/40 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <button
          className="absolute top-2 right-2 rounded-full p-1 hover:bg-slate-300"
          onClick={() => router.push("/")}
        >
          <IoClose size={18} />
        </button>
        <h1 className="font-bold text-2xl text-center m-3 mt-5">{title}</h1>
        <div className="flex justify-center items-center gap-1 flex-col px-6">
          {body}
        </div>
        <div className="shadow-xl shadow-slate-900 p-3 flex flex-col justify-center items-center mt-3">
          {errorMessage && (
            <div className="text-red-600 font-semibold">{errorMessage}</div>
          )}
          <Button
            btnText={buttonLabel}
            btnType="Submit"
            onClick={onSubmit}
            className="w-[350px] text-lg font-bold bg-slate-800 hover:bg-slate-700 !text-slate-50 py-3 mt-3"
          />
          <div className="text-center text-slate-800 m-2">{footerLabel}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
