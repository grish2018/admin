import { MutationTree } from "vuex";
import { MutationType } from "./MutationType";
import { State } from "./state";

export type Mutations<S = State> = {
  [MutationType.SET_USER](state: State, payload: {}): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SET_USER](state, payload) {
    state.user = payload;
  }
};
