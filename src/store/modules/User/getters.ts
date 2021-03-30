import { GetterTree } from "vuex";
import { State } from "./state";
import { RootState } from "@/store/rootState";

export type Getters = {
    userInfo(state: State): {};
    general(state: State): {};
}

export const getters: GetterTree<State, RootState> & Getters = {
  userInfo: (state) => {
    return state.user;
  },
  general: (state) => {
    return state.general;
  },
};
