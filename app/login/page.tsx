'use client';

import { useState } from "react";
import { redirect } from 'next/navigation'
import { useWsContext } from "../context/useWsContext";


export default function Login() {
    const [username, setUsername] = useState('');
    const {websocket} = useWsContext();


    const login = async () => {
        console.log('connected', websocket?.readyState);
        
        websocket!.send(JSON.stringify({
            username: username,
            type: 'login',
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
