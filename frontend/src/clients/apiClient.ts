import axios from "axios";

const baseUrl =
  import.meta.env.VITE_BASE_API_URL ||
  import.meta.env.VITE_BASE_API_URL_FALLBACK;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export default axiosInstance;
