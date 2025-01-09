'use client'
import { createContext } from "react";

export const WsContext =  createContext<WebSocket | null>(null);

export const WsProvider = ({ children } : { children: React.ReactNode }) => {
    const websocket = new WebSocket('ws://localhost:8001');
    
    return (
        <WsContext.Provider value={websocket}>
            {children}
        </WsContext.Provider>
    );
}