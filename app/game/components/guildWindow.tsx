"use client";

import { useEffect, useState } from "react";
import { getGuilds } from "@/app/services/guildService";
import GuildFinder from "./guildFinder";
import MyGuild from "./myGuild";

export default function GuildWindow() {
    const [guilds, setGuilds] = useState<any[]>([]); // État pour stocker les guilds
    const [loading, setLoading] = useState(true); // État pour gérer le chargement
    const [error, setError] = useState<string | null>(null); // État pour gérer les erreurs
    const [isExpanded, setIsExpanded] = useState(false); // État pour gérer l'expansion

    const WindowTitle = 'Guild'

    const toggleExpansion = () => {
        setIsExpanded((prev) => !prev); // Inverser l'état d'expansion
    };

    // useEffect(() => {
    //     getGuilds()
    //         .then((guilds) => {
    //             setGuilds(guilds);
    //             setLoading(false);
    //         })
    //         .catch((err) => {
    //             setError("Failed to fetch guilds");
    //             setLoading(false);
    //         });
        
    // }, []);

    return (
        <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${isExpanded ? "w-[500px] h-[400px]" : "w-[200px] h-[50px]"
                } bg-gray-100 border border-gray-300 shadow-lg rounded-lg transition-all duration-300`}
        >
            {/* Header avec le bouton pour basculer l'expansion */}
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

                <GuildFinder />
                // <MyGuild />

                // <div className="p-4 h-full">
                //     {loading ? (
                //         <p className="text-gray-500">Chargement des guilds...</p>
                //     ) : error ? (
                //         <p className="text-red-500">{error}</p>
                //     ) : guilds.length === 0 ? (
                //         <p className="text-gray-500">Aucune guild disponible.</p>
                //     ) : (
                //         <ul className="pl-5 overflow-auto">
                //             {guilds.map((guild) => (
                //                 <li key={guild.id} className="text-sm">
                //                     {guild.name}
                //                 </li>
                //             ))}
                //         </ul>
                //     )}
                // </div>
            )}
        </div>
    );
}