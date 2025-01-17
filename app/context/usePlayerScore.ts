import { useContext } from "react";
import { WebSocketContext } from "./webSocket/webSocketConstext";


export function usePlayerScore() {
    const webSocketContext = useContext(WebSocketContext);

    if (!webSocketContext) {
        throw new Error("WsContext must be used within a WsProvider");
    }

    const { playerScore } = webSocketContext.state;

    return playerScore;
}