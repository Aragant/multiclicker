'use client';

import { acceptApplicants, fetchApplicants, getGuildById, rejectApplicants } from "@/app/services/guildService";
import { getUsersByName } from "@/app/services/userService";
import { Guild } from "@/app/types/guild";
import { Applicant, PublicUser } from "@/app/types/user";
import { tabToString } from "@/app/utils/tabToString";
import { use, useEffect, useState } from "react";



export default function GuildApplicants() {
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [selectedPlayerInfo, setSelectedPlayerInfo] = useState<PublicUser | null>(null);
    const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchApplicants().then((applicants) => {
            if (applicants === null) {
                // afficher une erreur
                return;
            }
            console.log("applicants", applicants);
            setApplicants(applicants);
            setLoading(false)
        })

    }, []);


    useEffect(() => {
        if (selectedApplicant) {
            getUsersByName(selectedApplicant.username).then((userData) => {
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
    }, [selectedApplicant]);


    function handleReject() {
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

    function handleAccept() {
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
        <div className="flex flex-col h-full gap-4 p-4">
            <h3 className="text-lg font-bold text-violet-700">Guild Applicants</h3>

            {/* Main container */}
            <div className="flex w-full max-w-4xl h-[100%] overflow-hidden">
                {/* Applicant list */}
                <div className="w-1/3 bg-gray-100 overflow-y-auto rounded-l-lg">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
                        </div>
                    ) : applicants.length > 0 ? (
                        <ul>
                            {applicants.map((applicant) => (
                                <li
                                    key={applicant.userId}
                                    onClick={() => setSelectedApplicant(applicant)}
                                    className={`p-3 cursor-pointer hover:bg-gray-200 border-b border-gray-300 transition-colors ${selectedApplicant?.userId === applicant.userId ? "bg-violet-100" : ""}`}
                                >
                                    <div className="font-medium">{applicant.username}</div>
                                    <div className="text-xs text-gray-500">Applied: EX/EX/EXEX</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-4 text-gray-500 text-center">No pending applications.</p>
                    )}
                </div>

                {/* Applicant details */}
                <div className="w-2/3 p-4 h-[280px] border-t border-gray-300 bg-white relative pb-20 rounded-r-lg">
                    {selectedApplicant ? (
                        <div>
                            <h2 className="text-lg font-semibold text-violet-700">{selectedApplicant.username}</h2>
                            <div className="mt-3 space-y-2">
                                <p className="text-gray-700">
                                    <span className="font-medium">Level:</span> EX
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Message:</span>{" "}
                                    "I would like to join your guild!"
                                </p>
                            </div>

                            {/* Action buttons */}
                            <div className="absolute bottom-4 left-4 right-4 flex gap-4">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-white font-light tracking-wide button-scale"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={handleReject}
                                    className="flex-1 h-12 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 transition-all duration-300 text-white font-light tracking-wide button-scale"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">Select an applicant to view details.</p>
                    )}
                </div>
            </div>
        </div>
    )
}