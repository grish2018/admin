import {
  Store as VuexStore,
  DispatchOptions,
  CommitOptions,
  Module
} from "vuex";

import { RootState } from "@/store/rootState";
import { state, State } from "./state";
import { actions, Actions } from "./actions";
import { mutations, Mutations } from "./mutations";

export type OrdersStore<S = State> = Omit<
  VuexStore<S>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

export const store: Module<State, RootState> = {
  state,
  mutations,
  actions,
  namespaced: false,
};
