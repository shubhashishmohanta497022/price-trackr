import { useState } from "react";
import api from "./api/axiosClient";
import { useWebSocket } from "./hooks/useWebSocket";

const WS_URL = import.meta.env.VITE_WS_URL || "wss://ws.example.com/ws/updates";

export default function App() {
  const [url, setUrl] = useState("");
  const messages = useWebSocket(WS_URL);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/api/track", { url });
    setUrl("");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Price-Trackr</h1>
      <form onSubmit={submit} className="flex gap-2 mb-6">
        <input className="border p-2 flex-1" value={url} onChange={e=>setUrl(e.target.value)} placeholder="Paste product URL"/>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Track</button>
      </form>
      <div>
        <h2 className="font-semibold mb-2">Live updates</h2>
        <ul className="space-y-1 text-sm">
          {messages.slice(-10).map((m,i)=> <li key={i}><code>{m}</code></li>)}
        </ul>
      </div>
    </div>
  );
}
