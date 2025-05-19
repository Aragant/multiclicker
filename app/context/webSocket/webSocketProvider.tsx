// WebSocketProvider.tsx
'use client';
import { useEffect, useReducer, useState } from "react";
import { useHandleWebSocketEvent } from "./useHandleWebSocketEvent";
import { multiclickerReducer, initialState } from "@/app/context/multiclicker/multiclickerReducer";
import { WebSocketContext } from "./webSocketConstext";
import Storage from "@/app/utils/Storage";
import { usePathname } from "next/navigation";


interface WebSocketProviderProps {
    children: React.ReactNode;
}

const wsUrl = process.env.NEXT_PUBLIC_WS_URL;

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
    const [state, dispatch] = useReducer(multiclickerReducer, initialState);

    const [websocket, setWebSocket] = useState<WebSocket | null>(null);
    const pathname = usePathname();
    useEffect(() => {

        const playerId = Storage.getPlayerId();
        const clanId = Storage.getGuildId();
        if (!playerId || !clanId) {
            console.log("connect to clanId");
            return;
        }

        if (!playerId) {
            if (websocket) {
                websocket.close();
                setWebSocket(null);
            }
            return;
        }

        const webSocket = new WebSocket(`${wsUrl}`);
        setWebSocket(webSocket);
// ajouter un jwttoken dans le header pour securiser la connexion
        webSocket.onopen = () => {
            console.log("WebSocket connected");
            const loginEvent = {
                type: "login",
                playerId: playerId,
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

    }, [pathname]);

    useHandleWebSocketEvent(websocket, dispatch);



    return (
        <WebSocketContext.Provider value={{ websocket, state, dispatch }}>
            {children}
        </WebSocketContext.Provider>
    );
};
