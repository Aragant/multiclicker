'use client';

import { useEffect, useState } from "react";
import BigClick from "./components/BigClick";
import Player from "./components/player";
import SumScore from "./components/sumScore";
import GuildWindow from "./components/guildWindow";
import Link from "next/link";


export default function Clicker() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100%-76px)] py-16 gap-16 caret-transparent relative overflow-hidden">

      <Link
        className="absolute top-[10px] left-[10px] z-50 px-3 py-1 text-sm bg-white/80 hover:bg-white/90 border rounded-md shadow"
        href="/loginPage"
      >
        Logout
      </Link>

      {/* Background elements */}
      <div className="absolute top-[-10%] right-[-5%] w-64 h-64 rounded-full bg-violet-500/10 floating-slow"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 rounded-full bg-indigo-500/10 floating"></div>

      {/* Game content */}
      <div className={`stagger-container ${isLoaded ? "animate" : ""}`}>
        <div className="stagger-item fade-in-up">
          <SumScore />
        </div>

        <div className="stagger-item fade-in-up">
          <BigClick />
        </div>

        <div className="stagger-item fade-in-up">
          <Player />
        </div>
      </div>

      {/* Guild window */}
      <GuildWindow />
    </div>
  )
}