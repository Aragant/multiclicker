// WebSocketProvider.tsx
'use client';
import { useEffect, useReducer, useState } from "react";
import { useHandleWebSocketEvent } from "./useHandleWebSocketEvent";
import { multiclickerReducer, initialState } from "@/app/context/multiclicker/multiclickerReducer";
import { WebSocketContext } from "./webSocketConstext";
import Storage from "@/app/utils/Storage";



interface WebSocketProviderProps {
    children: React.ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
    const [state, dispatch] = useReducer(multiclickerReducer, initialState);

    const [websocket, setWebSocket] = useState<WebSocket | null>(null);


    //pas sur de l interet d un useEffect ici vus que l on est sencer arriver apres un changement de page .
    useEffect(() => {

        const playerName = Storage.getPlayerId();
        if (!playerName) {
            if (websocket) {
                websocket.close();
                setWebSocket(null);
            }
            return;
        }

        const webSocket = new WebSocket('ws://localhost:8001');
        setWebSocket(webSocket);

        //do connection to gamer name  we can send an key to the server to identify the player later
        webSocket.onopen = () => {
            console.log("WebSocket connected");
            const loginEvent = {
                type: "login",
                username: playerName,
            };
            webSocket.send(JSON.stringify(loginEvent));
        };


        webSocket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        webSocket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            if (webSocket) {
                webSocket.close();
            }
        };

    }, []);

    useHandleWebSocketEvent(websocket, dispatch);



    return (
        <WebSocketContext.Provider value={{ websocket, state, dispatch }}>
            {children}
        </WebSocketContext.Provider>
    );
};
