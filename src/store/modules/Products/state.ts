import { Product } from "@/types/Product";

export type State = {
  products: Product[];
  currentProduct: Product | null;
};

export const state: State = {
  products: [],
  currentProduct: null,
};
