import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://qbc11-front-next.liara.run/",
  withCredentials: true,
});
