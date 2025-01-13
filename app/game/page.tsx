'use client';

import { useState, useContext } from "react";
import { WsContext } from "../context/wsContext";
import BigClick from "../ui/game/BigClick";


export default function Clicker() {
    const [count, setCount] = useState(0);
    const websocket = useContext(WsContext);

    websocket!.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setCount(data.sumScore);
    };


    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">


            <p className="text-4xl">{count}</p>
            <BigClick />
        </div>
    );
}