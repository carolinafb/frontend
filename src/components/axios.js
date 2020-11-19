import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://localhost:9000",
  timeout: 1000000,
  withCredentials: true,
});
export default axiosInstance;
