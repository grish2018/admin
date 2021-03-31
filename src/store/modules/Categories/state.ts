import { Category } from "@/types/Category";

export type State = {
  categories: Category[];
  currentCategory: Category | null;
};

export const state: State = {
  categories: [],
  currentCategory: null,
};
