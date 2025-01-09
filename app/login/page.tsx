'use client';

import { useState, useContext } from "react";
import { WsContext } from "../context/wsContext";
import { redirect } from 'next/navigation'


export default function Login() {
    const [username, setUsername] = useState('');
    const websocket = useContext(WsContext);


    const login = async () => {
        console.log('connected', websocket?.readyState);
        
        websocket!.send(JSON.stringify({
            username: username,
            type: 'login',
        }));

        websocket!.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            redirect('/game');
        };
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <input className="text-black" 
            value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" />
            <button onClick={login}>Login</button>
        </div>
    );
}
