import { useContext } from "react";
import { WebSocketContext } from "./webSocket/webSocketConstext";


export function useClientClan() {
    const webSocketContext = useContext(WebSocketContext);

    if (!webSocketContext) {
        throw new Error("WsContext must be used within a WsProvider");
    }

    const { clientClan } = webSocketContext.state;

    return clientClan;
}