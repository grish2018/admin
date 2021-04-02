import { ActionTree, ActionContext } from "vuex";
import { ActionType } from "./ActionType";
import { MutationType } from "./MutationType";
import { RootState } from "@/store/rootState";
import { State } from "./state";
import { Mutations } from "./mutations";
import api from "@/plugins/Axios/api";
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
    data: { owner: { email: string; nickname: string; password: string } }
  ): Promise<void>;
  [ActionType.SIGN_OUT](context: AugmentedActionContext): void;
  [ActionType.GET_PROFILE](context: AugmentedActionContext): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionType.SIGN_IN]({ commit }, data) {
    const res = await api.post("/login", data, { authorization: false });
    setStorage("token", res.data.owner.token);
    setStorage("storeId", String(res.data.owner.storeId));
    commit(MutationType.SET_STOREID, String(res.data.owner.storeId));
    commit(MutationType.SET_TOKEN, res.data.owner.token);
    commit(MutationType.SET_USER, res.data);
  },
  async [ActionType.SIGN_UP]({ commit }, data) {
    const res = await api.post("/signup", data, { authorization: false });
    setStorage("token", res.data.owner.token);
    setStorage("storeId", String(res.data.owner.storeId));
    commit(MutationType.SET_TOKEN, res.data.owner.token);
    commit(MutationType.SET_STOREID, String(res.data.owner.storeId));
    commit(MutationType.SET_USER, res.data);
  },
  [ActionType.SIGN_OUT]({ commit }) {
    removeStorage("token");
    removeStorage("storeId");
    commit(MutationType.SET_USER, { account: {}, general: {} });
    commit(MutationType.SET_STOREID, "");
    commit(MutationType.SET_TOKEN, null);
  },
  async [ActionType.GET_PROFILE]({ commit, state }) {
    const storeId = state.storeId;
    const res = await api.get(`/${storeId}/profile`);
    commit(MutationType.SET_USER, res.data);
  },
  async [ActionType.SET_PROFILE]({ state }, data) {
    const storeId = state.storeId;
    api.put(`/${storeId}/profile`, data);
  },
};
