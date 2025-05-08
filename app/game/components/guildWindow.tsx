"use client";

import { useEffect, useState } from "react";
import GuildFinder from "./guildFinder";
import MyGuild from "./myGuild";
import Storage from "@/app/utils/Storage";
import GuildOption from "./GuildOption";

export default function GuildWindow() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [guildId, setGuildId] = useState<string | null>(null);
    const [indexActiveWindow, setIndexActiveWindow] = useState(0);


    const WindowTitle = 'Guild'

    useEffect(() => {
        const id = Storage.getGuildId();
        setGuildId(id);

        if (id) {
            setIndexActiveWindow(1);
        } else {
            setIndexActiveWindow(0);
        }

    }, []);


    const window = [
        <GuildFinder key={0} />,
        <MyGuild key={1} />,
        <GuildOption key={2} />,
    ]


    const toggleExpansion = () => {
        setIsExpanded((prev) => !prev);
    };
    return (
        <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${isExpanded ? "w-[500px] h-[400px]" : "w-[200px] h-[50px]"
                } bg-gray-100 border border-gray-300 shadow-lg rounded-lg transition-all duration-300`}
        >
            <div className="flex items-center justify-between p-2 bg-gray-200 rounded-t-lg">
                <span className="text-sm font-medium text-gray-700">
                    {WindowTitle}
                </span>
                {(isExpanded && indexActiveWindow > 0) && (
                    <>
                        <span
                            className={`text-sm cursor-pointer ${indexActiveWindow === 1 ? 'font-bold underline' : 'text-gray-500'}`}
                            onClick={() => setIndexActiveWindow(1)}
                        >
                            gudil info
                        </span>
                        <span
                            className={`text-sm cursor-pointer ${indexActiveWindow === 2 ? 'font-bold underline' : 'text-gray-500'}`}
                            onClick={() => setIndexActiveWindow(2)}
                        >
                            Option de guild
                        </span>
                    </>
                )}
                <button
                    onClick={toggleExpansion}
                    className="text-sm text-blue-500 hover:underline"
                >
                    {isExpanded ? "Minimiser" : "Agrandir"}
                </button>
            </div>

            {/* Contenu de la fenêtre */}
            {isExpanded && (
                window[indexActiveWindow]
            )}
        </div>
    );
}