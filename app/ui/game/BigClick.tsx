import { EventType } from "@/app/context/eventType";
import { useWsContext } from "@/app/context/useWsContext";


export default function BigClick() {
    const {websocket} = useWsContext();
    
    function bigClick() {
        const event = {
            type: EventType.CLICK,
        }

        websocket!.send(JSON.stringify(event));
    }

    return (
        <button
             onClick={bigClick}
             className="text-4xl text-black bg-orange-200 rounded-lg p-4 uppercase">click</button>
    );
}