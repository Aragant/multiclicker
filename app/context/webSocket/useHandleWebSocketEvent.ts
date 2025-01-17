// useWebSocket.ts
import { useEffect } from "react";
import { EventType } from "../eventType";
import { MulticlickerAction } from "@/app/context/multiclicker/multiclickerReducer";

export const useHandleWebSocketEvent = (websocket: WebSocket | null, dispatch: React.Dispatch<MulticlickerAction>) => {
    useEffect(() => {

        if (!websocket) {
            return;
        }

        websocket.onmessage = (event) => {
            handleMessage(event, dispatch);
        };

        websocket.onclose = () => console.log("WebSocket fermé.");
        websocket.onerror = (error) => console.error("WebSocket erreur :", error); 

        return () => {
            websocket.close();
        };
    }, [websocket, dispatch]);
};



const handleMessage = (event: MessageEvent, dispatch: React.Dispatch<MulticlickerAction>) => {
    const data = JSON.parse(event.data);
    if (data.type === EventType.CLICKED) {
        console.log("hadle message");
        dispatch({ type: 'SET_SUM_SCORE', payload: data.sumScore });
        dispatch({ type: 'SET_PLAYER_SCORE', payload: data.player });
    }
    console.log("Message reçu : ", data);
};
