import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { BotMessageSquare, LogIn } from "lucide-react";
import { ModeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="from-background/10 via-background/50 to-background/80 fixed top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b px-4 backdrop-blur-xl">
      <div className="flex items-center">
        <Link href={"/"}>
          <BotMessageSquare />
        </Link>
        <div className="flex items-center ">
          <span className="ml-2 text-sm font-medium hover:underline dark:text-zinc-200">
            Riddler
          </span>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button asChild>
          <Link href={"/login"}>
            <LogIn className="mr-2" size={14} />
            Login
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
}
