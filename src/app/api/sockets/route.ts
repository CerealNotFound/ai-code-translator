import WebSocket from "ws";
import { NextRequest, NextResponse } from "next/server";

export const runtime = {
  runtime: "edge",
};

export const POST = async (req: NextRequest) => {
  const {
    isConnected,
    payload,
  }: {
    isConnected: Boolean;
    payload: string | undefined;
  } = await req.json();
  const baseURL = "ws://localhost:3030";

  let ws: WebSocket | undefined;

  if (!isConnected) {
    ws = new WebSocket(baseURL);
    let error: Event | null = null;

    ws.on("open", () => {
      ws?.send(
        JSON.stringify({
          data: payload ? payload : "dummy data",
          meta: "join",
          room: 1234,
        })
      );
    });

    ws.onerror = () => {
      return new NextResponse(
        JSON.stringify(`Error occured while connecting to socket: ${error}`)
      );
    };

    ws.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      // Handle incoming messages
    };

    return new NextResponse(JSON.stringify("Attempted connection to sockets"));
  } else {
    ws
      ? (ws.onclose = () => {
          ws?.send(JSON.stringify("Terminating connection"));
          ws = undefined;
        })
      : null;
    return new Response(JSON.stringify("Terminated connection"));
  }
};
