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

const handleMessage = (
  event: MessageEvent,
  dispatch: React.Dispatch<MulticlickerAction>
) => {
  const data = JSON.parse(event.data);

  switch (data.type) {
    case EventType.CLICKED:
      dispatch({ type: "SET_SUM_SCORE", payload: data.sumScore });
      dispatch({ type: "SET_PLAYER_SCORE", payload: data.player });
      break;
    case EventType.GET_GAME_INFO:
      dispatch({ type: "GET_GAME_INFO", payload: data.game });

      break;
  }

  if (data.type === EventType.CLICKED) {
    dispatch({ type: "SET_SUM_SCORE", payload: data.sumScore });
    dispatch({ type: "SET_PLAYER_SCORE", payload: data.player });
  }
  if (data.type === EventType.GET_GAME_INFO) {
    console.log(data);
    dispatch({ type: "GET_GAME_INFO", payload: data.game });
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