import { Module } from "vuex";
import { ProductsStateTypes, RootState } from "@/store/types";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";

import type { State } from './state';

export { State };

export const store: Module<ProductsStateTypes, RootState> = {
  state,
  mutations,
  // TODO: How to configure a module without any actions?
  actions,
  // TODO: With namespaced option turned on, having problem how to use dispatch with action types...
  // But without it, a bigger store might have clashes in namings
  namespaced: true
};
