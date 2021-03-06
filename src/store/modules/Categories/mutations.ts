import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
import { MutationTree } from "vuex";
import { MutationType } from "./MutationType";
import { State } from "./state";

export type Mutations<S = State> = {
  [MutationType.SET_CATEGORIES](state: S, payload: Category[]): void;
  [MutationType.SET_CATEGORY_PRODUCTS](state: S, payload: Product[]): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SET_CATEGORIES](state, categories) {
    state.categories = categories;
  },
  [MutationType.SET_CATEGORY_PRODUCTS](state, products) {
    state.categoryProducts = products;
  },
};
