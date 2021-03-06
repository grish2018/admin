import { ActionTree, ActionContext } from "vuex";
import { ActionType } from "./ActionType";
import { MutationType } from "./MutationType";
import { RootState } from "@/store/rootState";
import { State } from "./state";
import { Mutations } from "./mutations";
import api from "@/plugins/Axios/api";
import { setStorage } from "@/utils/storage";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
  [ActionType.SIGN_IN](
    context: AugmentedActionContext,
    data: { email: string; hash: string }
  ): Promise<void>;
  [ActionType.SIGN_UP](
    context: AugmentedActionContext,
    data: { email: string; nickname: string; password: string }
  ): Promise<void>;
  [ActionType.GET_PROFILE](context: AugmentedActionContext): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionType.SIGN_IN]({ commit }, data) {
    const res = await api.post("/login", data, { authorization: false });
    setStorage("token", res.data.token);
    setStorage("storeId", String(res.data.storeId));
    commit(MutationType.SET_STOREID, String(res.data.storeId));
    commit(MutationType.SET_TOKEN, res.data.token);
    commit(MutationType.SET_USER, res.data);
    commit(MutationType.SET_ERROR_MESSAGE, "");
  },
  async [ActionType.SIGN_UP]({ commit }, data) {
    const res = await api.post("/signup", data, { authorization: false });
    setStorage("token", res.data.token);
    setStorage("storeId", String(res.data.storeId));
    commit(MutationType.SET_TOKEN, res.data.token);
    commit(MutationType.SET_STOREID, String(res.data.storeId));
    commit(MutationType.SET_USER, res.data);
    commit(MutationType.SET_ERROR_MESSAGE, "");
  },
  async [ActionType.GET_PROFILE]({ commit, state }) {
    const storeId = state.storeId;
    const res = await api.get(`/${storeId}/profile`);
    commit(MutationType.SET_USER, res.data);
  },
  async [ActionType.SET_PROFILE]({ state }, profile) {
    const storeId = state.storeId;
    await api.put(`/${storeId}/profile`, profile);
  },
};
