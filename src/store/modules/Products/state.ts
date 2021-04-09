import { Product } from "@/types/Product";

export type State = {
  products: Product[];
  currentProduct: Product | null;
};

export const getDefaultState = (): State => {
  return {
    products: [],
    currentProduct: null,
  };
};
export const state: State = getDefaultState();
