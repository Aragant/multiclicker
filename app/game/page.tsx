'use client';

import { useState } from "react";
import FloatingWindow from "../ui/FloatingWindow";
import BigClick from "../ui/game/BigClick";
import Player from "../ui/game/player";
import SumScore from "../ui/game/sumScore";
import Clans from "../ui/game/Clans";
import ClientClan from "../ui/game/clientClan";

export default function Clicker() {
  const [showClansWindow, setShowClansWindow] = useState(false);
  const [showClientClanWindow, setShowClientClanWindow] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-16 caret-transparent">
      <div />
      <div className="flex">
        <button onClick={() => setShowClansWindow(true)}>see all clans</button>

        <button onClick={() => setShowClientClanWindow(true)}>see your clans</button>
      </div>
      <div className="flex flex-col items-center gap-6">
        <SumScore />
        <BigClick />
      </div>
      <div>
        <Player />
      </div>
      {/* dans le futur on pourrais avoir un tableaux avec toutes les choses que l on veut montrer dans des floating window */}
      {showClansWindow && (
        <FloatingWindow title="Clans" onClose={() => setShowClansWindow(false)}>
          <Clans />
        </FloatingWindow>
      )}
      {showClientClanWindow && (
        <FloatingWindow title="Clans" onClose={() => setShowClientClanWindow(false)}>
          <ClientClan />
        </FloatingWindow>
      )}
    </div>

  );
}