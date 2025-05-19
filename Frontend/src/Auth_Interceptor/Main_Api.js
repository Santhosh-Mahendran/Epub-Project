import axios from "axios";
import { Base_Url } from "../Environment/Base_Url";

const Main_Api = axios.create({
  baseURL: Base_Url,
});

const AuthHeader = (config) => {
  const User_token = localStorage.getItem("User_Auth_Token");
  const publisher_token = localStorage.getItem("Publisher_Auth_Token");
  const token = User_token
    ? User_token
    : publisher_token
    ? publisher_token
    : "";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

Main_Api.interceptors.request.use(AuthHeader);

// ✅ Response Interceptor to catch 401 errors
Main_Api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);

    if (error.response.status === 401 || error.response.status === 422) {
      // Clear tokens if needed
      localStorage.removeItem("User_Auth_Token");
      localStorage.removeItem("Publisher_Auth_Token");

      // Redirect to login
      window.location.href = "/"; // Change this path to your login route
    }
    return Promise.reject(error);
  }
);

export default Main_Api;
