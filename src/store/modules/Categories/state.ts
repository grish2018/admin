import { Product } from "./../../../types/Product";
import { Category } from "@/types/Category";

export type State = {
  categories: Category[];
  categoryProducts: Product[];
};

export const state: State = {
  categories: [],
  categoryProducts: [],
};
