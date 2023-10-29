import axios from "axios";

export const baseInstance = axios.create({
  baseURL: "http://localhost:2345/", //process.env.BASE_URL
});
