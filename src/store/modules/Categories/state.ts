import { Category, NewCategory } from "@/types/Category";

export type State = {
  categories: Category[];
  currentCategory: Category | NewCategory | {};
};

export const state: State = {
  categories: [],
  currentCategory: {},
};
