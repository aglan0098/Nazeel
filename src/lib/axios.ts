// src/lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://nazeel-test-api.pgd.gov.sa",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
