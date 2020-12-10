import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://localhost:9000",
  timeout: 1000000,
  withCredentials: true,
});
axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  switch (error.response.status) {
    case 401:
      document.location.href = '/';
      break;
    case 403:
      document.location.href = '/';
      break;
    default:
      return Promise.reject(error);
  }
});
export default axiosInstance;
