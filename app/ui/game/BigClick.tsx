import { EventType } from "@/app/context/eventType";
import { useWebSocket } from "@/app/context/useWebSocket";


export default function BigClick() {
    const websocket = useWebSocket();
    
    function bigClick() {
        
        const event = {
            type: EventType.CLICK,
        }

        websocket?.send(JSON.stringify(event));
    }

    return (
        <button
             onClick={bigClick}
             className="text-4xl text-black bg-orange-200 rounded-lg p-4 uppercase">click</button>
    );
}