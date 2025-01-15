// WebSocketProvider.tsx
'use client';
import { useEffect, useReducer, useState } from "react";
import { useHandleWebSocketEvent } from "./useHandleWebSocketEvent";
import { multiclickerReducer, initialState } from "@/app/context/multiclicker/multiclickerReducer";
import { WebSocketContext } from "./webSocketConstext";



export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(multiclickerReducer, initialState);

    const [websocket, setWebSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        // Initialisation du WebSocket à l'intérieur de useEffect
        const webSocket = new WebSocket('ws://localhost:8001');
        setWebSocket(webSocket);

        return () => {
            // Ferme la connexion lorsque le composant est démonté
            if (webSocket) {
                webSocket.close();
            }
        };
        
    }, []);

    useHandleWebSocketEvent(websocket, dispatch);



    return (
        <WebSocketContext.Provider value={{websocket, state, dispatch }}>
            {children}
        </WebSocketContext.Provider>
    );
};
