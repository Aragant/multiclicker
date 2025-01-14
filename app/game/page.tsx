'use client';

import BigClick from "../ui/game/BigClick";
import SumScore from "../ui/game/sumScore";


export default function Clicker() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">


            <SumScore />
            <BigClick />
        </div>
    );
}