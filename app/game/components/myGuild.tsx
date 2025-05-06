'use client';

import { useState } from "react";

interface Player {
  id: number;
  name: string;
  role: string;
  level: number;
}

const mockPlayers: Player[] = [
  { id: 1, name: "Player Alpha", role: "Tank", level: 50 },
  { id: 2, name: "Player Beta", role: "Healer", level: 45 },
  { id: 3, name: "Player Gamma", role: "DPS", level: 60 },
  { id: 1, name: "Player Alpha", role: "Tank", level: 50 },
  { id: 2, name: "Player Beta", role: "Healer", level: 45 },
  { id: 3, name: "Player Gamma", role: "DPS", level: 60 },
  { id: 1, name: "Player Alpha", role: "Tank", level: 50 },
  { id: 2, name: "Player Beta", role: "Healer", level: 45 },
  { id: 3, name: "Player Gamma", role: "DPS", level: 60 },
  { id: 1, name: "Player Alpha", role: "Tank", level: 50 },
  { id: 2, name: "Player Beta", role: "Healer", level: 45 },
  { id: 3, name: "Player Gamma", role: "DPS", level: 60 },
  { id: 1, name: "Player Alpha", role: "Tank", level: 50 },
  { id: 2, name: "Player Beta", role: "Healer", level: 45 },
  { id: 3, name: "Player Gamma", role: "DPS", level: 60 },
  { id: 1, name: "Player Alpha", role: "Tank", level: 50 },
  { id: 2, name: "Player Beta", role: "Healer", level: 45 },
  { id: 3, name: "Player Gamma", role: "DPS", level: 60 },
];

export default function MyGuild() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null); // Joueur sélectionné

  const handleSelectPlayer = (player: Player) => {
    setSelectedPlayer(player);
  };

  return (
    <div className="flex flex-col  h-full gap-4 p-4">
      {/* Conteneur principal */}
      <div className="flex w-full max-w-4xl h-[280px] overflow-hidden">
        {/* Liste des joueurs */}
        <div className="w-1/3 bg-gray-100 overflow-y-auto">
          {mockPlayers.length > 0 ? (
            <ul>
              {mockPlayers.map((player) => (
                <li
                  key={player.id}
                  onClick={() => handleSelectPlayer(player)}
                  className="p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-300"
                >
                  {player.name}
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
              <h3 className="text-xl font-bold">{selectedPlayer.name}</h3>
              <p className="text-gray-700">Rôle : {selectedPlayer.role}</p>
              <p className="text-gray-500 mt-2">Niveau : {selectedPlayer.level}</p>
            </div>
          ) : (
            <p className="text-gray-500">Cliquez sur un joueur pour voir ses informations.</p>
          )}
        </div>
      </div>
    </div>
  );
}