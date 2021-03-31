import { NewCategory, Category } from "./../../../types/Category";

import { ActionTree, ActionContext } from "vuex";
import { ActionType } from "./ActionType";
import { MutationType } from "./MutationType";
import { RootState } from "@/store/rootState";
import { State } from "./state";
import { Mutations } from "./mutations";
import axios from "@/plugins/Axios";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
  [ActionType.GET_CATEGORIES](context: AugmentedActionContext): Promise<void>;
  [ActionType.CREATE_CATEGORY](
    context: AugmentedActionContext,
    category: NewCategory,
  ): Promise<void>;
  [ActionType.EDIT_CATEGORY](
    context: AugmentedActionContext,
    category: Category,
    id: number
  ): Promise<void>;
}
export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionType.GET_CATEGORIES]({ commit, rootState }): Promise<void> {
    const storeId = rootState.user.storeId;
    const res = await axios.get(`/${storeId}/categories`, {
      authorization: true,
    });
    commit(MutationType.SET_CATEGORIES, res.data);
  },
  async [ActionType.CREATE_CATEGORY]({ rootState }, category): Promise<void> {
    const storeId = rootState.user.storeId;
    await axios.post(`/${storeId}/categories`, { category }, { authorization: true });
  },
  async [ActionType.EDIT_CATEGORY]({ rootState }, category): Promise<void> {
    const storeId = rootState.user.storeId;
    const id = category.id;
    await axios.put(`/${storeId}/categories/${id}`, { category }, { authorization: true });
  },
};
