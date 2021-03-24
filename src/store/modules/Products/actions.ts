import { ActionTree, ActionContext } from "vuex";
import { ActionType } from "./ActionType";
import { MutationType } from "./MutationType";
import { RootState } from "@/store/rootState";
import { State } from "./state";
import { Mutations } from "./mutations";
import axios from "@/plugins/Axios/axios";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
  [ActionType.GET_PRODUCTS](context: AugmentedActionContext): Promise<void>;
}
export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionType.GET_PRODUCTS]({ commit, rootState }): Promise<void> {
    const storeId = rootState.user.storeId;
    const res = await axios.get(`/${storeId}/products`, {
      authorization: true,
    });
    commit(MutationType.SET_PRODUCTS, res.data);
  },
};
