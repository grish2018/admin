import { Category } from "@/types/Category";
import { MutationTree } from "vuex";
import { MutationType } from "./MutationType";
import { State } from "./state";

export type Mutations<S = State> = {
  [MutationType.SET_CATEGORIES](state: S, payload: []): void;
  [MutationType.SET_CURRENT_CATEGORY](state: S, payload: {} | null): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SET_CATEGORIES](state: State, categories: []): void {
    state.categories = categories;
  },
  [MutationType.SET_CURRENT_CATEGORY](state: State, category: Category): void {
    state.currentCategory = category;
  },
};
