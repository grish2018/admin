import { MutationTree } from "vuex";
import { MutationType } from "./MutationType";
import { getDefaultState, State } from "./state";

export type Mutations<S = State> = {
  [MutationType.SET_CUSTOMERS](state: S, payload: []): void;
  [MutationType.RESET_STATE](state: S): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SET_CUSTOMERS](state: State, customers: []): void {
    state.customers = customers;
  },
  [MutationType.RESET_STATE](state) {
    Object.assign(state, getDefaultState());
  },

};
