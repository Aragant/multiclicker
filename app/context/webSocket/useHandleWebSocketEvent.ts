// useWebSocket.ts
import { useEffect } from "react";
import { EventType } from "../eventType";
import { MulticlickerAction } from "@/app/context/multiclicker/multiclickerReducer";

export const useHandleWebSocketEvent = (
  websocket: WebSocket | null,
  dispatch: React.Dispatch<MulticlickerAction>
) => {
  useEffect(() => {
    if (!websocket) {
      return;
    }

    initWebSocketEvent(websocket, dispatch);

    return () => {
      websocket.close();
    };
  }, [websocket, dispatch]);
};

const handleMessage = async (
  event: MessageEvent,
  dispatch: React.Dispatch<MulticlickerAction>
) => {
  console.log("Message reçu : ", event);
  const data = await JSON.parse(event.data);


  // console.log(" ???  ", EventType.CLICKED === data.type);
  console.log(" ???  ", data);
  console.log(" ???  ", data.type);

  console.log(" ???  ", data.sumScore);
  switch (data.type) {
    case EventType.CLICKED:
      dispatch({ type: "SET_SUM_SCORE", payload: data.sumScore });
      dispatch({ type: "SET_PLAYER_SCORE", payload: data.player });
      break;
    case EventType.SET_GAME_INFO:
      dispatch({ type: "SET_GAME_INFO", payload: data.game });

      break;
  }

  console.log("Message reçu : ", data);
};

function initWebSocketEvent(
  websocket: WebSocket,
  dispatch: React.Dispatch<MulticlickerAction>
) {
  websocket.onmessage = (event) => {
    handleMessage(event, dispatch);
  };

  websocket.onclose = () => console.log("WebSocket fermé.");

  websocket.onerror = (error) => console.error("WebSocket erreur :", error);
}