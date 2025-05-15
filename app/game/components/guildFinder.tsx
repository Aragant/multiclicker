'use client';

import { getGuilds, joinGuild } from "@/app/services/guildService";
import { Guild } from "@/app/types/guild";
import { useState, useEffect } from "react";



export default function GuildFinder() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredGuilds, setFilteredGuilds] = useState<Guild[]>([]);

    const [guilds, setGuilds] = useState<Guild[]>([]);
    const [selectedGuild, setSelectedGuild] = useState<Guild | null>(null);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getGuilds()
            .then((guilds) => {
                setGuilds(guilds)
                setFilteredGuilds(guilds);
            })
            .catch((err) => {
                setError("Failed to fetch guilds");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();

        setSearchTerm(term);
        const filteredGuilds =
            guilds.filter((guild) =>
                guild.name.toLowerCase().includes(term)
            )
        setFilteredGuilds(filteredGuilds);
    };

    const handleSelectGuild = (guild: Guild) => {
        setSelectedGuild(guild);
    };

    const handleJoinGuild = () => {
        if (selectedGuild) {
            joinGuild(selectedGuild.id)
                .then((response: any) => {
                    if (response) {

                    } else {
                        console.error("Failed to join guild");
                    }
                })
        }
    };

    return (
        <div className="flex flex-col h-full gap-4 p-4">
            {/* Search bar */}
            <div className="w-full max-w-2xl">
                <input
                    type="text"
                    placeholder="Search for a guild..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
                />
            </div>

            {/* Main container */}
            <div className="flex w-full max-w-4xl h-[100%]  overflow-hidden">
                {/* Guild list */}
                <div className="w-1/3 bg-gray-100 overflow-y-auto rounded-l-lg">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
                        </div>
                    ) : filteredGuilds.length > 0 ? (
                        <ul>
                            {filteredGuilds.map((guild) => (
                                <li
                                    key={guild.id}
                                    onClick={() => handleSelectGuild(guild)}
                                    className={`p-3 cursor-pointer hover:bg-gray-200 border-b border-gray-300 transition-colors ${selectedGuild?.id === guild.id ? "bg-violet-100" : ""}`}
                                >
                                    <div className="font-medium">{guild.name}</div>
                                    <div className="text-xs text-gray-500">Members: EX{guild.sum_members}</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-4 text-gray-500 text-center">No guilds found.</p>
                    )}
                </div>

                {/* Guild details */}
                <div className="w-2/3 p-4 h-[270px] bg-white rounded-r-lg">
                    {selectedGuild ? (
                        <div className="h-full flex flex-col">
                            <h3 className="text-xl font-bold text-violet-700">{selectedGuild.name}</h3>
                            <p className="text-gray-700 mt-2 flex-grow">{selectedGuild.description}</p>
                            <div className="mt-2 mb-4">
                                <span className="text-sm text-gray-500">Members: EX{selectedGuild.sum_members}</span>
                                {selectedGuild && (
                                    <span className="ml-4 text-sm text-gray-500">Level: EX</span>
                                )}
                            </div>
                            <button
                                className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 button-scale"
                                onClick={handleJoinGuild}
                            >
                                Join Guild
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">Select a guild to view details</div>
                    )}
                </div>
            </div>
        </div>
    )
}