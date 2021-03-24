import { ActionTree, ActionContext } from "vuex";
import { ActionType } from "./ActionType";
import { MutationType } from "./MutationType";
import { RootState } from "@/store/rootState";
import { State } from "./state";
import { Mutations } from "./mutations";
import { store } from "@/store/index";
import axios from "@/plugins/axios";

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
  async [ActionType.GET_PRODUCTS]({ commit }): Promise<void> {
    const token = store.state.user.token;
    const storeId = store.state.user.storeId;
    const res = await axios.get(`/${storeId}/products`, {
      headers: {
        Authorization: `${token}`
      }
    });
    commit(MutationType.SET_PRODUCTS, res.data);
  }
};
