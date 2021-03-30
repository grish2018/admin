import { createStore } from "vuex";
import { store as products, ProductsStore } from "@/store/modules/Products";
import { store as user, UserStore } from "@/store/modules/User";
import { RootState } from "./rootState";

export type Store = ProductsStore<Pick<RootState, "products">> &
  UserStore<Pick<RootState, "user">>;

export const store = createStore({
  strict: process.env.NODE_ENV === "development",
  modules: {
    products,
    user,
  },
});

export function useStore(): Store {
  return store as Store;
}
