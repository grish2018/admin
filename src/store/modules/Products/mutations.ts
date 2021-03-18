import { MutationTree } from "vuex";
import { MutationType } from "./MutationType";
import { ProductsMutationsTypes, ProductsStateTypes } from "./../../types";

export const mutations: MutationTree<ProductsStateTypes> &
  ProductsMutationsTypes = {
  [MutationType.SET_PRODUCTS](state: ProductsStateTypes, products: []): void {
    state.products = products;
  }
};
