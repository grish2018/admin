import axios from "axios";

const client = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || "",
  withCredentials: true
});

export default client;
