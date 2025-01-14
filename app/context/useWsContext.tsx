import { useContext } from "react";
import { WsContext } from "@/app/context/wsContext";

export function useWsContext() {
    const wsContext = useContext(WsContext);

    if (!wsContext) {
        throw new Error("WsContext must be used within a WsProvider");
    }

    return wsContext;
}
