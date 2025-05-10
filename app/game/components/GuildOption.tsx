'use client';

import { fetchApplicants, getGuildById } from "@/app/services/guildService";
import { getUsersByName } from "@/app/services/userService";
import { Guild } from "@/app/types/guild";
import { Applicants, PublicUser } from "@/app/types/user";
import { tabToString } from "@/app/utils/tabToString";
import { use, useEffect, useState } from "react";



export default function GuildOption() {
  const [guild, setGuild] = useState<Guild | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Applicants | null>(null);



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

    }).catch((error) => {
      console.error("Erreur lors de la récupération de la guilde :", error);
    });

  }, []);


  return (
    <div className="flex flex-col  h-full gap-4 p-4">
      {/* Conteneur principal */}
      <div className="flex w-full max-w-4xl h-[280px] overflow-hidden">

       

        {/* Informations sur le joueur sélectionné */}
        <div className="w-2/3 p-4">
          super option de la super guild : (se serais pas mal de faire des options de guildes)
        </div>
      </div>
    </div>
  );
}