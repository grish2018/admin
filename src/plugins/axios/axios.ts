import axios from "axios";
import { Axios, Config } from "./types";
import { Store } from "@/store";
import { Router } from "vue-router";
import { RouteNames } from "@/router/RouteNames";

const config: Config = {
  baseURL: process.env.VUE_APP_BASE_URL || "",
  withCredentials: false,
};

const client: Axios = axios.create(config);

export const initInterceptors = ({ store, router }: { store: Store; router: Router }) => {
  client.interceptors.request.use((config: Config) => {
    const token = store.state.user.token;
    if (config.authorization) {
      config.headers.authorization = token;
    }
    return config;
  });
  client.interceptors.response.use(
    res => res,
    err => {
      if (err.response.status === 401) {
        router.push({ name: RouteNames.SIGN_IN });
      }
      throw err;
    }
  );
};

export default client;
