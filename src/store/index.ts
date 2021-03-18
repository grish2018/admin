import { createStore } from "vuex";

import { store as products, ProductsStore } from "@/store/modules/Products";
import { RootState } from "./rootState";
export type Store = ProductsStore<Pick<RootState, "products">>;

export const store = createStore({
  modules: {
    products
  }
});

export function useStore(): Store {
  return store as Store;
}
