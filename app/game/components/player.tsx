"use client"

import { usePlayerScore } from "@/app/context/usePlayerScore";
import { useEffect, useState } from "react";

export default function Player() {
    const players = usePlayerScore();
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        setAnimate(true)
    }, [])

    useEffect(() => {
    }, [players])

    return (
        <div className="player flex flex-col items-center mt-8">
            <h3 className="text-xl font-bold mb-4 text-violet-600 fade-in-up">Players</h3>
            <ul className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 min-w-[200px]">
                {players.map((player, index) => {
                    return (
                        <li
                            key={player.username}
                            className={`py-2 px-4 border-b border-gray-100 last:border-0 flex justify-between items-center stagger-item fade-in-left ${animate ? "animate" : ""}`}
                            style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                        >
                            <span className="font-medium text-gray-800">{player.username}</span>
                            <span className="bg-violet-100 text-violet-800 px-2 py-1 rounded-full text-sm font-bold">
                                {player.sumScore}
                            </span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}