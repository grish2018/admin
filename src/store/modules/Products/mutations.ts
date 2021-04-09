import { Product } from "@/types/Product";
import { MutationTree } from "vuex";
import { MutationType } from "./MutationType";
import { getDefaultState, State } from "./state";

export type Mutations<S = State> = {
  [MutationType.SET_PRODUCTS](state: S, payload: Product[]): void;
  [MutationType.SET_CURRENT_PRODUCT](state: S, product: Product): void;
  [MutationType.RESET_STATE](state: S): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SET_PRODUCTS](state, products: []) {
    state.products = products;
  },
  [MutationType.SET_CURRENT_PRODUCT](state, product) {
    state.currentProduct = product;
  },
  [MutationType.RESET_STATE](state) {
    Object.assign(state, getDefaultState());
  },
};
