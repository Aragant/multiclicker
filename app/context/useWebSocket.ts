import { useContext } from "react";
import { WebSocketContext } from "./webSocket/webSocketConstext";

export function useWebSocket() {
    const webSocketContext = useContext(WebSocketContext);

    if (!webSocketContext) {
        throw new Error("WsContext must be used within a WsProvider");
    }

    return webSocketContext.websocket;

}
