import { useContext } from "react";
import { WebSocketContext } from "./webSocketConstext";

export function useWebSocket() {
    const webSocketContext = useContext(WebSocketContext);

    if (!webSocketContext) {
        throw new Error("WsContext must be used within a WsProvider");
    }

    const { sumScore } = webSocketContext.state;

    return { sumScore, websocket: webSocketContext.websocket, dispatch: webSocketContext.dispatch };
}
