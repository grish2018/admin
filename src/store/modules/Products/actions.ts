import { NewProduct, Product } from "@/types/Product";
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
  [ActionType.GET_PRODUCTS](context: AugmentedActionContext): Promise<void>;
  [ActionType.GET_PRODUCT_BY_ID](context: AugmentedActionContext, id: number): Promise<void>;
  [ActionType.CREATE_PRODUCT](
    context: AugmentedActionContext,
    product: NewProduct,
  ): Promise<void>;
  [ActionType.EDIT_PRODUCT](
    context: AugmentedActionContext,
    product: Product,
    id: number
  ): Promise<void>;
}
export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionType.GET_PRODUCTS]({ commit, rootState }): Promise<void> {
    const storeId = rootState.user.storeId;
    const res = await axios.get(`/${storeId}/products`);
    commit(MutationType.SET_PRODUCTS, res.data);
  },
  async [ActionType.GET_PRODUCT_BY_ID]({ commit, rootState }, id): Promise<void> {
    const storeId = rootState.user.storeId;
    const res = await axios.get(`/${storeId}/products/${id}`);
    commit(MutationType.SET_CURRENT_PRODUCT, res.data.product);
  },
  async [ActionType.CREATE_PRODUCT]({ rootState }, product): Promise<void> {
    const storeId = rootState.user.storeId;
    await axios.post(`/${storeId}/products`, { product });
  },
  async [ActionType.EDIT_PRODUCT]({ rootState }, product): Promise<void> {
    const storeId = rootState.user.storeId;
    const id = product.id;
    await axios.put(`/${storeId}/products/${id}`, { product });
  },
};
