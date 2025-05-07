'use client';

import { getGuildById } from "@/app/services/guildService";
import { getUsersByName } from "@/app/services/userService";
import { Guild } from "@/app/types/guild";
import { PublicUser } from "@/app/types/user";
import { tabToString } from "@/app/utils/tabToString";
import { use, useEffect, useState } from "react";


// const mockPlayers: Player[] = [
//   { id: 1, name: "Player Alpha", role: "Tank", level: 50 },
//   { id: 2, name: "Player Beta", role: "Healer", level: 45 },
//   { id: 3, name: "Player Gamma", role: "DPS", level: 60 },
//   { id: 1, name: "Player Alpha", role: "Tank", level: 50 },
//   { id: 2, name: "Player Beta", role: "Healer", level: 45 },
//   { id: 3, name: "Player Gamma", role: "DPS", level: 60 },
//   { id: 1, name: "Player Alpha", role: "Tank", level: 50 },
//   { id: 2, name: "Player Beta", role: "Healer", level: 45 },
//   { id: 3, name: "Player Gamma", role: "DPS", level: 60 },
//   { id: 1, name: "Player Alpha", role: "Tank", level: 50 },
//   { id: 2, name: "Player Beta", role: "Healer", level: 45 },
//   { id: 3, name: "Player Gamma", role: "DPS", level: 60 },
//   { id: 1, name: "Player Alpha", role: "Tank", level: 50 },
//   { id: 2, name: "Player Beta", role: "Healer", level: 45 },
//   { id: 3, name: "Player Gamma", role: "DPS", level: 60 },
//   { id: 1, name: "Player Alpha", role: "Tank", level: 50 },
//   { id: 2, name: "Player Beta", role: "Healer", level: 45 },
//   { id: 3, name: "Player Gamma", role: "DPS", level: 60 },
// ];

export default function MyGuild() {
  const [guild, setGuild] = useState<Guild | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<PublicUser | null>(null);
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

  return (
    <div className="flex flex-col  h-full gap-4 p-4">
      {/* Conteneur principal */}
      <div className="flex w-full max-w-4xl h-[280px] overflow-hidden">
        {/* Liste des joueurs */}
        <div className="w-1/3 bg-gray-100 overflow-y-auto">
          {guild && players.length > 0 ? (
            <ul>
              {players.map((player) => (
                <li
                  key={player.id}
                  onClick={() => setSelectedPlayer(player)}
                  className="p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-300"
                >
                  {player.username}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-2 text-gray-500">Aucun joueur trouvé.</p>
          )}
        </div>

        {/* Informations sur le joueur sélectionné */}
        <div className="w-2/3 p-4">
          {selectedPlayer ? (
            <div>
              <h3 className="text-xl font-bold">{selectedPlayer.username}</h3>
              <p className="text-gray-700">Rôle : se serais bien de donner les roles{}</p>
              <p className="text-gray-500 mt-2">Niveau : et des niveaux{}</p>
            </div>
          ) : (
            <p className="text-gray-500">Cliquez sur un joueur pour voir ses informations.</p>
          )}
        </div>
      </div>
    </div>
  );
}