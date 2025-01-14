'use client';
import { createContext, useEffect, useState } from "react";

type WsContextType = {
    websocket: WebSocket | null;
    sumScore: number;
    setSumScore: React.Dispatch<React.SetStateAction<number>>;
    handleMessage: (event: MessageEvent) => void;
};

export const WsContext = createContext<WsContextType | null>(null);

export const WsProvider = ({ children }: { children: React.ReactNode }) => {
    const [sumScore, setSumScore] = useState(0);
    const [websocket, setWebsocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8001');
        setWebsocket(ws);

        ws.onmessage = (event) => {
            // Centralize message handling here
            handleMessage(event);
        };

        ws.onclose = () => console.log("WebSocket fermé.");
        ws.onerror = (error) => console.error("WebSocket erreur :", error); 

        return () => {
            ws.close();
        };
    }, []);

    const handleMessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        if (data.type === "clicked") {
            setSumScore(data.sumScore);
        }
        console.log("Message reçu : ", data);
    };

    return (
        <WsContext.Provider value={{ websocket, sumScore, setSumScore, handleMessage }}>
            {children}
        </WsContext.Provider>
    );
};
