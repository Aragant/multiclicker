import { useContext } from "react";
import { WebSocketContext } from "./webSocket/webSocketConstext";

export function useSumScore() {
    const webSocketContext = useContext(WebSocketContext);

    if (!webSocketContext) {
        console.warn("WebSocketContext is unavailable. Returning default player score.");
        return 0;
    }

    const { sumScore } = webSocketContext.state;

    return sumScore ?? 0;
}
