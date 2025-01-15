import { createContext } from "react";

import {MulticlickerState, MulticlickerAction } from "@/app/context/multiclicker/multiclickerReducer";

type WebSocketContextType = {
    websocket: WebSocket | null;
    state: MulticlickerState;
    dispatch: React.Dispatch<MulticlickerAction>;
};

export const WebSocketContext = createContext<WebSocketContextType | null>(null);