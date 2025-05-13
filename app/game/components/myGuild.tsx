'use client';

import { getGuildById } from "@/app/services/guildService";
import { getUsersByName } from "@/app/services/userService";
import { Guild } from "@/app/types/guild";
import { PublicUser } from "@/app/types/user";
import { tabToString } from "@/app/utils/tabToString";
import { use, useEffect, useState } from "react";
import { ShieldIcon, AwardIcon, UsersIcon, StarIcon, ClockIcon } from "../../icons"

export default function MyGuild() {
  const [guild, setGuild] = useState<Guild | null>(null);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [loading, setLoading] = useState(true)
  const [players, setPlayers] = useState<PublicUser[]>([]);



  useEffect(() => {
    const guildId = localStorage.getItem("guild_id");
    if (!guildId) {
      // trouver une erreur a renvoyer
      return;
    }
    getGuildById(guildId).then((guildData) => {
      if (guildData === null) {
        // afficher une erreur
        return;
      }

      setGuild(guildData);
      setLoading(false)
    }).catch((error) => {
      console.error("Erreur lors de la récupération de la guilde :", error);
    });

  }, []);

  useEffect(() => {
    if (!guild) return;
    getUsersByName(tabToString(guild.members)).then((players) => {
      if (players === null) {
        // afficher une erreur
        return;
      }
      setPlayers(players);
      console.log("players", players);
    }).catch((error) => {
      console.error("Erreur lors de la récupération des joueurs :", error);
    });

  }, [guild]);

  if (guild)
    return (
      <div className="space-y-6">
        {/* Guild header */}
        <div className="bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white">
              <ShieldIcon size={32} />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-violet-700">{guild.name}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <UsersIcon size={14} className="mr-1" />
                <span>{guild.members.length} members</span>
                {guild && (
                  <>
                    <span className="mx-2">•</span>
                    <AwardIcon size={14} className="mr-1" />
                    <span>Level EX </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <p className="mt-3 text-gray-600">{guild.description}</p>
        </div>

        {/* Guild stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-violet-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-violet-700">{guild.members.length}</div>
            <div className="text-xs text-gray-500">Members</div>
          </div>
          <div className="bg-indigo-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-indigo-700">{1}</div>
            <div className="text-xs text-gray-500">Guild Level</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-700">
              {/* {guild.members.filter((m) => m.status === "online" || m.status === "ingame").length} */} Status online ou non
            </div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
        </div>

        {/* Member list */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
            <UsersIcon size={16} className="mr-2" /> MEMBERS
          </h4>
          <div className="bg-white border rounded-lg overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
              </div>
            ) : (
              <div className="divide-y">
                {guild.members.map((member) => (
                  <div
                    key={member}
                    onClick={() => setSelectedMember(member === selectedMember ? null : member)}
                    className={`p-3 cursor-pointer transition-colors ${selectedMember === member ? "bg-violet-50" : "hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                            {member.charAt(0)}
                          </div>
                          {/* <div
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${member.status === "online"
                              ? "bg-green-500"
                              : member.status === "ingame"
                                ? "bg-blue-500"
                                : "bg-gray-400"
                              }`}
                          ></div> */}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium flex items-center">
                            {member}
                            {/* {member.role === "leader" && (
                              <StarIcon size={14} className="ml-1 text-amber-500" fill="currentColor" />
                            )}
                            {member.role === "officer" && <ShieldIcon size={14} className="ml-1 text-blue-500" />} */}
                          </div>
                          {/* <div className="text-xs text-gray-500">
                            {member.role === "leader"
                              ? "Guild Leader"
                              : member.role === "officer"
                                ? "Guild Officer"
                                : "Member"}
                          </div> */}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center">
                          <AwardIcon size={14} className="mr-1" />
                          Lvl: EX
                        </div>
                      </div>
                    </div>

                    {/* Expanded member details */}
                    {/* {selectedMember?.id === member.id && (
                      <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600 grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-500">Contribution:</span>{" "}
                          <span className="font-medium">{member.contribution || 0} points</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Joined:</span>{" "}
                          <span className="font-medium">{member.joinedDate || "Unknown"}</span>
                        </div>
                        <div className="col-span-2 flex items-center mt-1">
                          <ClockIcon size={14} className="mr-1 text-gray-400" />
                          <span className="text-gray-400">
                            {member.status === "online"
                              ? "Currently online"
                              : member.status === "ingame"
                                ? "Currently in game"
                                : "Last seen 2h ago"}
                          </span>
                        </div>
                      </div>
                    )} */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
}