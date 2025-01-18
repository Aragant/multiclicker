import { useContext } from "react";
import { WebSocketContext } from "./webSocket/webSocketConstext";


export function useClans() {
    const webSocketContext = useContext(WebSocketContext);

    if (!webSocketContext) {
        throw new Error("WsContext must be used within a WsProvider");
    }



    const { clans } = webSocketContext.state;

    return clans;
}