'use client';

import { useState } from "react";
import BigClick from "../ui/game/BigClick";
import Player from "../ui/game/player";
import SumScore from "../ui/game/sumScore";
import GuildWindow from "./components/guildWindow";


export default function Clicker() {
  const [isGuildExpanded, setIsGuildExpanded] = useState(false); // État pour gérer l'ouverture/fermeture

  const toggleGuild = () => {
    setIsGuildExpanded((prev) => !prev); // Inverser l'état
  };


  return (
    <div className="flex flex-col items-center justify-center h-full gap-16 caret-transparent">
      <div />
      <div className="flex flex-col items-center gap-6">
        <SumScore />
        <BigClick />
      </div>
      <div>
        <Player />
      </div>
      {/* div placer en bas a droit de manierre fix  */}
      <GuildWindow />
    </div>
  );
}