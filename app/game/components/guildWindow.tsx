"use client";

import { useEffect, useState } from "react";
import GuildFinder from "./guildFinder";
import MyGuild from "./myGuild";
import Storage from "@/app/utils/Storage";

export default function GuildWindow() {
    const [isExpanded, setIsExpanded] = useState(false);

    const WindowTitle = 'Guild'

    const guildId = Storage.getGuildId();

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
                <button
                    onClick={toggleExpansion}
                    className="text-sm text-blue-500 hover:underline"
                >
                    {isExpanded ? "Minimiser" : "Agrandir"}
                </button>
            </div>

            {/* Contenu de la fenêtre */}
            {isExpanded && (
                guildId ? (
                    <MyGuild />
                ) : (
                    <GuildFinder />
                )
            )}
        </div>
    );
}