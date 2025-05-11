'use client';

import { acceptApplicants, fetchApplicants, getGuildById, rejectApplicants } from "@/app/services/guildService";
import { getUsersByName } from "@/app/services/userService";
import { Guild } from "@/app/types/guild";
import { Applicant, PublicUser } from "@/app/types/user";
import { tabToString } from "@/app/utils/tabToString";
import { use, useEffect, useState } from "react";



export default function GuildApplicants() {
    const [selectedPlayer, setSelectedPlayer] = useState<Applicant | null>(null);
    const [applicants, setApplicants] = useState<Applicant[]>([]);
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


    function callToRejectApplicants() {
        if (!selectedPlayerInfo) {
            console.error("Aucun joueur sélectionné");
            return;
        }
        rejectApplicants(selectedPlayerInfo?.id).then((response) => {
            if (response === null) {
                // afficher une erreur
                return;
            }
            console.log("response", response);
            setApplicants((prevApplicants) => prevApplicants.filter((applicant) => applicant.userId !== selectedPlayerInfo.id));
            setSelectedPlayerInfo(null);
        })
    }

    function callToAcceptApplicants() {
        if (!selectedPlayerInfo) {
            console.error("Aucun joueur sélectionné");
            return;
        }
        acceptApplicants(selectedPlayerInfo?.id).then((response) => {
            if (response === null) {
                // afficher une erreur
                return;
            }
            console.log("response", response);
            setApplicants((prevApplicants) => prevApplicants.filter((applicant) => applicant.userId !== selectedPlayerInfo.id));
            setSelectedPlayerInfo(null);
        })
    }

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
                <div className="w-2/3 p-4 border-t border-gray-300 bg-white relative pb-20">
                    {selectedPlayerInfo ? (
                        <div>
                            <h2 className="text-lg font-semibold">{selectedPlayerInfo.username}</h2>
                            <p className="text-gray-500">description:</p>
                            <p>{selectedPlayerInfo.description}</p>

                            {/* Boutons en bas */}
                            <div className="absolute bottom-4 left-4 right-4 flex gap-4">
                                <button onClick={callToAcceptApplicants} className="flex-1 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-white font-light tracking-wide button-scale">
                                    Accepter
                                </button>
                                <button onClick={callToRejectApplicants} className="flex-1 h-12 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 transition-all duration-300 text-white font-light tracking-wide button-scale">
                                    Rejeter
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">Sélectionnez un joueur pour voir ses informations.</p>
                    )}
                </div>
            </div>
        </div>
    );
}