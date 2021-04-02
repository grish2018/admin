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
  [ActionType.GET_CUSTOMERS](context: AugmentedActionContext): Promise<void>;
  [ActionType.DELETE_CUSTOMER](context: AugmentedActionContext, token: string): Promise<void>;
  [ActionType.DELETE_CHECKED_CUSTOMERS](context: AugmentedActionContext, checkedCustomers: number[]): Promise<void>;
}
export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionType.GET_CUSTOMERS]({ commit, rootState }) {
    const storeId = rootState.user.storeId;
    const res = await api.get(`/${storeId}/customers`);
    commit(MutationType.SET_CUSTOMERS, res.data);
  },
  async [ActionType.DELETE_CUSTOMER]({ rootState }, token) {
    const storeId = rootState.user.storeId;
    await api.delete(`/${storeId}/customers/${token}`);
  },
  async [ActionType.DELETE_CHECKED_CUSTOMERS]({ rootState }, checkedCustomers) {
    const storeId = rootState.user.storeId;

    await api.delete(`/${storeId}/customers`, {
      list: [...checkedCustomers],
    });
  },
};
