import { useEffect, useRef, useState } from "react";

export function useWebSocket(url: string) {
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;
    ws.onmessage = (evt) => setMessages((m) => [...m, evt.data]);
    ws.onclose = () => { /* auto-reconnect could be added */ };
    return () => ws.close();
  }, [url]);

  return messages;
}
