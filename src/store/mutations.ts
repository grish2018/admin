import { MutationTree } from "vuex";
import { MutationType } from "./MutationType";
import { RootState } from "./rootState";
import { getDefaultState as getUserState } from "./modules/User/state";
import { getDefaultState as getProductsState } from "./modules/Products/state";
import { getDefaultState as getOrdersState } from "./modules/Orders/state";
import { getDefaultState as getCategoriesState } from "./modules/Categories/state";
import { getDefaultState as getCustomersState } from "./modules/Customers/state";

export type Mutations<S = RootState> = {
  [MutationType.RESET_STATE](state: S): void;
}

export const mutations: MutationTree<RootState> & Mutations = {
  [MutationType.RESET_STATE](state) {
    Object.assign(state, {
      user: getUserState(),
      customer: getCustomersState(),
      orders: getOrdersState(),
      products: getProductsState(),
      categories: getCategoriesState(),
    });
  },
};
