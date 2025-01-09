'use client';

import { useState, useContext } from "react";
import { WsContext } from "../context/wsContext";


export default function Clicker() {
    const [count, setCount] = useState(0);
    const websocket = useContext(WsContext);

    websocket!.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        setCount(data.sumClick);
    };

    
    function bigClick() {
        console.log('bigclick');
        setCount(count + 1);

        const event = {
            type: 'click',
        }

        websocket!.send(JSON.stringify(event));
    }

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">
            <p className="text-4xl">{count}</p>
            <button
             onClick={bigClick}
             className="text-4xl text-black bg-orange-200 rounded-lg p-4 uppercase">click</button>
        </div>
    );
}