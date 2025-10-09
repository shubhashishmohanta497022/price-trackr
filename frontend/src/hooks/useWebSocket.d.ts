interface UseWebSocketOptions {
    onMessage?: (data: any) => void;
    onOpen?: () => void;
    onClose?: () => void;
    onError?: (error: Event) => void;
}
export declare const useWebSocket: (url: string, options?: UseWebSocketOptions) => {
    isConnected: boolean;
    lastMessage: any;
    sendMessage: (message: any) => void;
};
export {};
//# sourceMappingURL=useWebSocket.d.ts.map