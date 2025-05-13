'use client';

import { fetchApplicants, getGuildById } from "@/app/services/guildService";
import { getUsersByName } from "@/app/services/userService";
import { Guild } from "@/app/types/guild";
import { Applicant, PublicUser } from "@/app/types/user";
import { tabToString } from "@/app/utils/tabToString";
import { use, useEffect, useState } from "react";



export default function GuildOption() {
  const [guild, setGuild] = useState<Guild | null>(null);
  const [guildName, setGuildName] = useState("")
  const [guildDescription, setGuildDescription] = useState("")
  const [confirmLeave, setConfirmLeave] = useState(false)


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
      setGuildName(guildData.name);
      setGuildDescription(guildData.description);
    }).catch((error) => {
      console.error("Erreur lors de la récupération de la guilde :", error);
    });

  }, []);


  const handleLeaveGuild = () => {
    if (confirmLeave) {
      alert("leave guild hasnt been developed.")
    } else {
      setConfirmLeave(true)
      setTimeout(() => setConfirmLeave(false), 3000)
    }
  }

  const handleSaveChanges = () => {
    alert("update guild not dev actually")
  }

  return (
    <div className="flex flex-col h-full gap-4 p-4">
      <h3 className="text-lg font-bold text-violet-700">Guild Settings</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Guild Name</label>
          <input
            type="text"
            value={guildName}
            onChange={(e) => setGuildName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Guild Description</label>
          <textarea
            value={guildDescription}
            onChange={(e) => setGuildDescription(e.target.value)}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 focus:border-transparent"
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleSaveChanges}
            className="flex-1 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 button-scale"
          >
            Save Changes
          </button>

          <button
            onClick={handleLeaveGuild}
            className={`flex-1 py-2 rounded-lg ${confirmLeave
              ? "bg-gradient-to-r from-red-600 to-rose-600 text-white"
              : "border border-red-300 text-red-600"
              } font-medium transition-all duration-300 button-scale`}
          >
            {confirmLeave ? "Confirm Leave" : "Leave Guild"}
          </button>
        </div>
      </div>
    </div>
  )
}