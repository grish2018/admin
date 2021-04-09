import { Product } from "./../../../types/Product";
import { Category } from "@/types/Category";

export type State = {
  categories: Category[];
  categoryProducts: Product[];
};

export const getDefaultState = (): State => {
  return {
    categories: [],
    categoryProducts: [],
  };
};
export const state: State = getDefaultState();
