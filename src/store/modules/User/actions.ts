import { ActionTree, ActionContext } from "vuex";
import { ActionType } from "./ActionType";
import { MutationType } from "./MutationType";
import { RootState } from "@/store/rootState";
import { State } from "./state";
import { Mutations } from "./mutations";
import axios from "@/plugins/axios";
import { setStorage, removeStorage } from "@/utils/storage";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
  [ActionType.SIGN_IN](
    context: AugmentedActionContext,
    data: { owner: { email: string; hash: string } }
  ): Promise<void>;
  [ActionType.SIGN_UP](
    context: AugmentedActionContext,
    data: { owner: { email: string; login: string; password: string } }
  ): Promise<void>;
  [ActionType.SIGN_OUT](context: AugmentedActionContext): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionType.SIGN_IN]({ commit }, data): Promise<void> {
    const res = await axios.post("/login", data);
    setStorage("token", res.data.owner.token);
    setStorage("storeId", String(res.data.owner.storeId));
    commit(MutationType.SET_STOREID, String(res.data.owner.storeId));
    commit(MutationType.SET_TOKEN, res.data.owner.token);
    commit(MutationType.SET_USER, res.data);
  },
  async [ActionType.SIGN_UP]({ commit }, data): Promise<void> {
    const res = await axios.post("/signup", data);
    setStorage("token", res.data.owner.token);
    setStorage("storeId", String(res.data.owner.storeId));
    commit(MutationType.SET_TOKEN, res.data.owner.token);
    commit(MutationType.SET_STOREID, String(res.data.owner.storeId));
    commit(MutationType.SET_USER, res.data);
  },
  [ActionType.SIGN_OUT]({ commit }): void {
    removeStorage("token");
    removeStorage("storeId");
    commit(MutationType.SET_USER, {});
    commit(MutationType.SET_STOREID, "");
    commit(MutationType.SET_TOKEN, null);
  }
};
