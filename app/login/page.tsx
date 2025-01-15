'use client';

import { useState } from "react";
import { redirect } from 'next/navigation'
import { useWebSocket } from "../context/useWebSocket";
import { EventType } from "../context/eventType";


export default function Login() {
    const [username, setUsername] = useState('');
    const websocket = useWebSocket();


    const login = async () => {
        console.log('connected', websocket?.readyState);
        
        websocket?.send(JSON.stringify({
            username: username,
            type: EventType.LOGIN,
        }));

        redirect('/game');
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <input className="text-black" 
            value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" />
            <button onClick={login}>Login</button>
        </div>
    );
}
