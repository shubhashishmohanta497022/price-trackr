import { useEffect, useRef, useState } from 'react';
export const useWebSocket = (url, options = {}) => {
    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState(null);
    const wsRef = useRef(null);
    useEffect(() => {
        const ws = new WebSocket(url);
        wsRef.current = ws;
        ws.onopen = () => {
            setIsConnected(true);
            options.onOpen?.();
        };
        ws.onclose = () => {
            setIsConnected(false);
            options.onClose?.();
        };
        ws.onerror = (error) => {
            options.onError?.(error);
        };
        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setLastMessage(data);
                options.onMessage?.(data);
            }
            catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };
        return () => {
            ws.close();
        };
    }, [url]);
    const sendMessage = (message) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(message));
        }
    };
    return {
        isConnected,
        lastMessage,
        sendMessage,
    };
};
//# sourceMappingURL=useWebSocket.js.map