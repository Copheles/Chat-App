import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error.response.data);
  }
);

export default axiosClient;
