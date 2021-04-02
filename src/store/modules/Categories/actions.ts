import { Category, NewCategory } from "@/types/Category";
import { ActionTree, ActionContext } from "vuex";
import { ActionType } from "./ActionType";
import { MutationType } from "./MutationType";
import { RootState } from "@/store/rootState";
import { State } from "./state";
import { Mutations } from "./mutations";
import api from "@/plugins/Axios/api";

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
  ): Promise<Category>;
  [ActionType.EDIT_CATEGORY](
    context: AugmentedActionContext,
    category: NewCategory,
    id: number
  ): Promise<Category>;
  [ActionType.DELETE_CATEGORY](
    context: AugmentedActionContext,
    id: number
  ): Promise<void>;
}
export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionType.GET_CATEGORIES]({ commit, rootState }) {
    const storeId = rootState.user.storeId;
    const res = await api.get(`/${storeId}/categories`);
    commit(MutationType.SET_CATEGORIES, res.data);
  },
  async [ActionType.CREATE_CATEGORY]({ rootState }, category) {
    const storeId = rootState.user.storeId;
    const res = await api.post(`/${storeId}/categories`, { category });
    return res.data.category;
  },
  async [ActionType.EDIT_CATEGORY]({ rootState }, editedCategory) {
    const storeId = rootState.user.storeId;
    const id = editedCategory.id;
    const category = { title: editedCategory.title, desc: editedCategory.desc };
    const res = await api.put(`/${storeId}/categories/${id}`, { category });
    return res.data.category;
  },
  async [ActionType.DELETE_CATEGORY]({ rootState }, id) {
    const storeId = rootState.user.storeId;
    await api.delete(`/${storeId}/categories/${id}`);
  },
};
