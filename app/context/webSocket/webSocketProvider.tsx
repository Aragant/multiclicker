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

const wsUrl = process.env.NEXT_PUBLIC_WS_URL;

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
    const [state, dispatch] = useReducer(multiclickerReducer, initialState);

    const [websocket, setWebSocket] = useState<WebSocket | null>(null);

    useEffect(() => {

        const playerName = Storage.getPlayerId();
        if (!playerName) {
            if (websocket) {
                websocket.close();
                setWebSocket(null);
            }
            return;
        }

        const webSocket = new WebSocket(`${wsUrl}/ws`);
        setWebSocket(webSocket);

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
