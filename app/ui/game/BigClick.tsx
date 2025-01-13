import { WsContext } from "@/app/context/wsContext";
import { useContext } from "react";


export default function BigClick() {
    const websocket = useContext(WsContext);
    
    function bigClick() {
        const event = {
            type: 'click',
        }

        websocket!.send(JSON.stringify(event));
    }

    return (
        <button
             onClick={bigClick}
             className="text-4xl text-black bg-orange-200 rounded-lg p-4 uppercase">click</button>
    );
}