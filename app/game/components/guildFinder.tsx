'use client';

import { getGuilds, joinGuild } from "@/app/services/guildService";
import { Guild } from "@/app/types/guild";
import { useState, useEffect } from "react";



export default function GuildFinder() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredGuilds, setFilteredGuilds] = useState<Guild[]>([]); // Guilds filtrées
    const [selectedGuild, setSelectedGuild] = useState<Guild | null>(null); // Guild sélectionnée
    const [loading, setLoading] = useState(true); // État de chargement
    const [error, setError] = useState<string | null>(null); // État des erreurs

    useEffect(() => {
        getGuilds()
            .then((guilds) => {
                console.log(guilds);
                setFilteredGuilds(guilds);
                console.log("filteredGuilds", filteredGuilds);
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
        setFilteredGuilds((prevGuilds) =>
            prevGuilds.filter((guild) =>
                guild.name.toLowerCase().includes(term)
            )
        );
    };

    const handleSelectGuild = (guild: Guild) => {
        setSelectedGuild(guild);
    };

    const handleJoinGuild = () => {
        if (selectedGuild) {
            console.log(`Rejoindre la guild: ${selectedGuild.id}`);
            joinGuild(selectedGuild.id)
                .then((response: any) => {
                    if (response) {
                        console.log("Guild joined successfully:", response);

                    } else {
                        console.error("Failed to join guild");
                    }
                })
        }
    };

    return (
        <div className="flex flex-col  h-full gap-4 p-4">
            {/* Barre de recherche */}
            <div className="w-full max-w-2xl">
                <input
                    type="text"
                    placeholder="Rechercher une guild..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
                />
            </div>

            {/* Conteneur principal */}
            <div className="flex w-full max-w-4xl h-[270px]  overflow-hidden">
                {/* Liste des guilds trouvées */}
                <div className="w-1/3 bg-gray-100 overflow-y-auto">
                    {loading ? (
                        <p className="p-2 text-gray-500">Chargement des guilds...</p>
                    ) : error ? (
                        <p className="p-2 text-red-500">{error}</p>
                    ) : filteredGuilds.length > 0 ? (
                        <ul>
                            {filteredGuilds.map((guild) => (
                                <li
                                    key={guild.id}
                                    onClick={() => handleSelectGuild(guild)}
                                    className="p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-300"
                                >
                                    {guild.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-2 text-gray-500">Aucune guild trouvée.</p>
                    )}
                </div>

                {/* Informations sur la guild sélectionnée */}
                <div className="w-2/3 p-4">
                    {selectedGuild ? (
                        <div>
                            <h3 className="text-xl font-bold">{selectedGuild.name}</h3>
                            <p className="text-gray-700">{selectedGuild.description}</p>
                            <p className="text-gray-500 mt-2">Membres : {selectedGuild.sum_members}</p>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => handleJoinGuild()}>
                                Rejoindre la guild
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-500">Cliquez sur une guild pour voir ses informations.</p>
                    )}
                </div>
            </div>
        </div>
    );
}