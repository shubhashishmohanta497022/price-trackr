import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.example.com",
  withCredentials: false,
});
export default api;
