'use client';

import BigClick from "../ui/game/BigClick";
import Player from "../ui/game/player";
import SumScore from "../ui/game/sumScore";


export default function Clicker() {
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
      </div>
    );
}