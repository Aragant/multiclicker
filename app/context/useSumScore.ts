import { useContext } from "react";
import { WebSocketContext } from "./webSocket/webSocketConstext";

export function useSumScore() {
    const webSocketContext = useContext(WebSocketContext);

    if (!webSocketContext) {
        throw new Error("WsContext must be used within a WsProvider");
    }

    const { sumScore } = webSocketContext.state;

    return sumScore;
}
