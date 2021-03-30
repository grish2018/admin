import { MutationTree } from "vuex";
import { MutationType } from "./MutationType";
import { State } from "./state";

export type Mutations<S = State> = {
  [MutationType.SET_USER](state: State, payload: {}): void;
  [MutationType.SET_TOKEN](state: State, token: string | null): void;
  [MutationType.SET_STOREID](state: State, id: string | null): void;
  [MutationType.SET_ACCOUNT](state: State, payload: {}): void;
  [MutationType.SET_GENERAL](state: State, payload: {}): void;
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
  [MutationType.SET_ACCOUNT](state, payload) {
    state.user = payload;
  },
  [MutationType.SET_GENERAL](state, payload) {
    state.general = payload;
  },
};
