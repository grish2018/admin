import { MutationTree } from "vuex";
import { MutationType } from "./MutationType";
import { State } from "./state";

export type Mutations<S = State> = {
  [MutationType.SET_USER](state: State, payload: {}): void;
  [MutationType.SET_TOKEN](state: State, token: string): void;
  [MutationType.SET_STOREID](state: State, id: string): void;

  [MutationType.REMOVE_USER](state: State, payload: {}): void;
  [MutationType.REMOVE_TOKEN](state: State, token: string | null): void;
  [MutationType.REMOVE_STOREID](state: State, id: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SET_USER](state, payload) {
    state.user = payload;
  },
  [MutationType.SET_TOKEN](state, token) {
    state.token = token;
  },
  [MutationType.SET_STOREID](state, id) {
    state.storeId = id;
  },

  [MutationType.REMOVE_USER](state, payload) {
    state.user = payload;
  },
  [MutationType.REMOVE_TOKEN](state, token) {
    state.token = token;
  },
  [MutationType.REMOVE_STOREID](state, id) {
    state.storeId = id;
  }
};
