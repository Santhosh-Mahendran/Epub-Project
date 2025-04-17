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

export default Main_Api;
