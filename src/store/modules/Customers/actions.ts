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
  [ActionType.GET_CUSTOMERS](context: AugmentedActionContext): Promise<void>;
  [ActionType.DELETE_CUSTOMER](context: AugmentedActionContext, token: string): Promise<void>;
  [ActionType.DELETE_CHECKED_CUSTOMERS](context: AugmentedActionContext, checkedCustomers: number[]): Promise<void>;
}
export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionType.GET_CUSTOMERS]({ commit, rootState }): Promise<void> {
    const storeId = rootState.user.storeId;
    const res = await axios.get(`/${storeId}/customers`, {
      authorization: true,
    });
    commit(MutationType.SET_CUSTOMERS, res.data);
  },
  async [ActionType.DELETE_CUSTOMER]({ rootState }, token): Promise<void> {
    const storeId = rootState.user.storeId;
    await axios.delete(`/${storeId}/customers/${token}`, {
      authorization: true,
    });
  },
  async [ActionType.DELETE_CHECKED_CUSTOMERS]({ rootState }, checkedCustomers): Promise<void> {
    const storeId = rootState.user.storeId;

    await axios.delete(`/${storeId}/customers`, {
      authorization: true,
      data: { list: [...checkedCustomers] },
    });
  },
};
