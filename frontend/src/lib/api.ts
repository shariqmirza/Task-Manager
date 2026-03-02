import axios from "axios";

export const api = axios.create({
  baseURL: "https://task-manager-backend-6bsx.onrender.com",
  withCredentials: true,
});
