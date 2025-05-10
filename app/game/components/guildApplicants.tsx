'use client';

import { fetchApplicants, getGuildById } from "@/app/services/guildService";
import { getUsersByName } from "@/app/services/userService";
import { Guild } from "@/app/types/guild";
import { Applicants, PublicUser } from "@/app/types/user";
import { tabToString } from "@/app/utils/tabToString";
import { use, useEffect, useState } from "react";



export default function GuildApplicants() {
    const [selectedPlayer, setSelectedPlayer] = useState<Applicants | null>(null);
    const [applicants, setApplicants] = useState<Applicants[]>([]);
    const [selectedPlayerInfo, setSelectedPlayerInfo] = useState<PublicUser | null>(null);


    useEffect(() => {
        fetchApplicants().then((applicants) => {
            if (applicants === null) {
                // afficher une erreur
                return;
            }
            console.log("applicants", applicants);
            setApplicants(applicants);
        })

    }, []);


    useEffect(() => {
        if (selectedPlayer) {
            getUsersByName(selectedPlayer.username).then((userData) => {
                if (userData === null) {
                    // afficher une erreur
                    return;
                }
                // in logic we send only on user so we take the first one
                setSelectedPlayerInfo(userData[0]);
            }).catch((error) => {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
            });
        }
    }, [selectedPlayer]);

    return (
        <div className="flex flex-col  h-full gap-4 p-4">
            {/* Conteneur principal */}
            <div className="flex w-full max-w-4xl h-[280px] overflow-hidden">

                <div className="w-1/3 bg-gray-100 overflow-y-auto">
                    {applicants.length > 0 ? (
                        <ul>
                            {applicants.map((applicants) => (
                                <li
                                    key={applicants.userId}
                                    onClick={() => setSelectedPlayer(applicants)}
                                    className="p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-300"
                                >
                                    {applicants.username}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-2 text-gray-500">Aucun joueur trouvé.</p>
                    )}
                </div>

                {/* Informations sur le joueur sélectionné */}
                <div className="w-2/3 p-4">
                    {selectedPlayerInfo ? (
                        <div>
                            <h2 className="text-lg font-semibold">{selectedPlayerInfo.username}</h2>
                            <p className="text-gray-500">description:</p>
                            <p>{selectedPlayerInfo.description}</p>
                            {/* Afficher d'autres informations sur le joueur ici */}
                        </div>
                    ) : (
                        <p className="text-gray-500">Sélectionnez un joueur pour voir ses informations.</p>
                    )}
                </div>
            </div>
        </div>
    );
}