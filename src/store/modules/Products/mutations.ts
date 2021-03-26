import { Product } from "@/types/Product";
import { MutationTree } from "vuex";
import { MutationType } from "./MutationType";
import { State } from "./state";

export type Mutations<S = State> = {
  [MutationType.SET_PRODUCTS](state: S, payload: []): void;
  [MutationType.ADD_PRODUCT](state: S, payload: Product): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SET_PRODUCTS](state: State, products: []): void {
    state.products = products;
  },
  [MutationType.ADD_PRODUCT](state: State, payload: Product): void {
    state.products = [...state.products, payload];
  },
};
