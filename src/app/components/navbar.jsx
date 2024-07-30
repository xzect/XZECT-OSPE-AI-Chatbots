
import React from "react";
import { RiNextjsFill } from "react-icons/ri";
import { CgFormatSlash } from "react-icons/cg";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import {FaBars} from "react-icons/fa6";

export const Navbar =()=>{
    return (
      <>
        <div className="flex fixed z-50 justify-between w-full h-[64px] items-center bg-[#09090B] border pl-2 border-zinc-800 rounded">
          <div className="flex items-center">
            <Link href="/">
              <RiNextjsFill size={36} />
            </Link>
            <CgFormatSlash size={36} color="gray" />
            <button className="text-zinc-100 font-bold">Login</button>
          </div>

          <div>
            <div className="flex hidebtnS">
              
              <Link href="https://github.com/Mr-armanalam">
                <button
                  className="bg-black flex flex-row justify-center items-center
                 rounded-md border border-zinc-800 w-[150px] font-bold text-sm h-[42px] mr-2
                 hover:bg-black hover:shadow-md hover:shadow-gray-800 focus:outline-none"
                >
                  <FaGithub style={{ marginRight: "14px" }} />
                  Github
                </button>
              </Link>

              <button
                className="rounded-md border border-zinc-800 w-[150px] h-[42px] bg-white
               text-sm font-bold mr-4 text-zinc-800 hover:bg-black hover:shadow-md 
               hover:shadow-gray-800 hover:text-white focus:outline-none"
              >
                Coding Assistant
              </button>
            </div>

            <FaBars className="flex hidebtnM mr-4 " size={30} />
          </div>
        </div>
      </>
    );
}