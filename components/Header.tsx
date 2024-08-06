"use client";

import { FiEdit, FiMenu } from "react-icons/fi";
import Button from "./UI/Button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AiModals {
  value: string;
  text: string;
}

const Header = () => {
  const router = useRouter();
  const { data, status } = useSession();

  const aiModals: AiModals[] = [
    { value: "flash", text: "Gemini 1.5 flash" },
    { value: "pro", text: "Gemini 1.5 pro" },
  ];

  return (
    <div className="w-full px-6 py-3 flex justify-between items-center bg-slate-900 text-white shadow-lg shadow-slate-500 border-b border-b-slate-600">
      <div className="flex gap-4">
        <Link
          href="/"
          className="hover:bg-slate-700 p-2 rounded"
          title="New chat"
        >
          <FiEdit size={28} />
        </Link>
        <div className="hidden sm:block bg-slate-700 rounded-full py-2 px-3">
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
      {status !== "loading" && (
        <div className="flex">
          {status === "authenticated" ? (
            <Button btnText="Log Out" onClick={signOut} />
          ) : (
            <div className="flex gap-3">
              <Button
                btnText="Register"
                className="bg-transparent !text-slate-100 border border-slate-400"
                onClick={() => router.push("/register")}
              />
              <Button btnText="Log In" onClick={() => router.push("/login")} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
