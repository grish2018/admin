import { Product } from "@/types/Product";
import { MutationTree } from "vuex";
import { MutationType } from "./MutationType";
import { State } from "./state";

export type Mutations<S = State> = {
  [MutationType.SET_PRODUCTS](state: S, payload: Product[]): void;
  [MutationType.SET_CURRENT_PRODUCT](state: S, product: Product): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SET_PRODUCTS](state, products: []) {
    state.products = products;
  },
  [MutationType.SET_CURRENT_PRODUCT](state, product) {
    state.currentProduct = product;
  },
};
