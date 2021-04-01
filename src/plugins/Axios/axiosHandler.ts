import { Config } from "./types";
import axios from "./index";
import { AxiosResponse } from "axios";

export function get(url: string, config?: Config): Promise<AxiosResponse> {
  return axios.get(url, config);
}

export function post(url: string, data: any, config?: Config): Promise<AxiosResponse> {
  return axios.post(url, data, config);
}

export function put(url: string, data: any, config?: Config): Promise<AxiosResponse> {
  return axios.put(url, data, config);
}

export function patch(url: string, data: any, config?: Config): Promise<AxiosResponse> {
  return axios.patch(url, data, config);
}

export function remove(url: string, config?: Config): Promise<AxiosResponse> {
  return axios.delete(url, config);
}
