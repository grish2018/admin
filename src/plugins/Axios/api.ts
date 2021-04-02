import axios from "./index";
import { Config, NewAxiosResponse } from "./types";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default {
  get: (url: string, config?: Config): Promise<NewAxiosResponse> => {
    return axios.get(url, config);
  },
  delete: (url: string, data?: any, config?: Config): Promise<NewAxiosResponse> => {
    return axios.delete(url, {
      ...config,
      data,
    });
  },
  post: (url: string, data: any, config?: Config): Promise<NewAxiosResponse> => {
    return axios.post(url, data, config);
  },
  patch: (url: string, data: any, config?: Config): Promise<NewAxiosResponse> => {
    return axios.patch(url, data, config);
  },
  put: (url: string, data: any, config?: Config): Promise<NewAxiosResponse> => {
    return axios.put(url, data, config);
  },
};
