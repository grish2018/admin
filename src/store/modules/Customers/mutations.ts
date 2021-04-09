import { MutationTree } from "vuex";
import { MutationType } from "./MutationType";
import { State } from "./state";

export type Mutations<S = State> = {
  [MutationType.SET_CUSTOMERS](state: S, payload: []): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SET_CUSTOMERS](state: State, customers: []): void {
    state.customers = customers;
  },
};
