import { Product } from "@/types/Product";

export type State = {
  products: Product[];
};

export const state: State = {
  products: [],
};
