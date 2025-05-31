import axios from "axios";

// Determine the base URL based on the environment
const getBaseURL = () => {
  if (import.meta.env.DEV) {
    return "http://localhost:5000";
  }
  return "https://bloodbridge-server.vercel.app";
};

const instance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now(),
    };

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Check if the response is empty
    if (!response.data) {
      return Promise.reject(new Error("Empty response from server"));
    }
    return response;
  },
  (error) => {
    console.error("API Error:", error.response || error);
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
