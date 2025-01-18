import { EventType } from "@/app/context/eventType";
import { useWebSocket } from "@/app/context/useWebSocket";
import { useClans } from "@/app/context/useClans";
import { useState } from "react";


export default function Clans() {

    const [clanName, setclanName] = useState('');
    const websocket = useWebSocket();
    const clans = useClans();

    function joinClan(selectedClanName: string) {
        const event = {
            type: EventType.JOIN_CLAN,
            'clanName': selectedClanName
        }
        websocket?.send(JSON.stringify(event));
    }

    function createClan() {
        const event = {
            type: EventType.JOIN_CLAN,
            'clanName': clanName
        }
        console.log('event', event);
        websocket?.send(JSON.stringify(event));
    }

    return (
        <div className="clans flex flex-col">
            <div className="flex items-center">
                <input value={clanName} type="text" placeholder="create clan" onChange={(e) => setclanName(e.target.value)} />
                <button onClick={createClan}>create</button>
            </div>
            <ul>
                {
                    clans.map((clan) => {
                        if (clan.clan !== null) {
                            return (
                                <li key={clan.clan}>
                                    <button onClick={() => clan.clan && joinClan(clan.clan)}> join clan : {clan.clan} </button>
                                </li>
                            );
                        }
                    })
                }
            </ul>
        </div>
    );
}