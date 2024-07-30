"use client";
import React from "react";
import { PiUserBold } from "react-icons/pi";
import { SiGooglebard } from "react-icons/si";

function AiResponse({ chatHistory, usersubmit ,storeQuestion}) {
  return (
    <>
      <div className="overflow-auto flex flex-col-reverse scrollbar max-h-[60vh]">
        {usersubmit && (
          <>
            <div>
               {chatHistory.map((msg, index) => (
                <>
                  <div
                    key={index}
                    className="flex flex-row border-b pb-4 border-zinc-800 hover:shadow hover:shadow-black mb-4"
                  >
                    <PiUserBold size={32} />
                    <p className="text-slate-100 w-[92%] ps-4 text-wrap">
                      {storeQuestion[index]}
                    </p>
                  </div>
                  <div
                    key={index}
                    className="flex border-b pb-4 border-zinc-800 mb-4 hover:shadow hover:shadow-black"
                  >
                    <SiGooglebard size={30} />
                    <p className="text-slate-100 w-[92%] ps-4 text-wrap">
                      {msg}
                    </p>
                  </div>
                </>
              ))}

            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AiResponse;
