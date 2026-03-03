import axios from "axios";

export const api = axios.create({
  baseURL: "https://task-manager-backend-6bsx.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});