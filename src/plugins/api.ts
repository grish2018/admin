import axios from "./axios";
import { URLS } from "./urls";

export const getProducts = (): Promise<void> => {
  return axios.get(URLS.PRODUCTS);
};

export const createProduct = (data: {}): Promise<void> => {
  return axios.post(URLS.PRODUCTS, data);
};
