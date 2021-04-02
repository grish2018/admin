import { createStore } from "vuex";
import { store as products, ProductsStore } from "@/store/modules/Products";
import { store as user, UserStore } from "@/store/modules/User";
import { store as orders, OrdersStore } from "@/store/modules/Orders";
import { RootState } from "./rootState";

export type Store = ProductsStore<Pick<RootState, "products">> &
  UserStore<Pick<RootState, "user">> &
  OrdersStore<Pick<RootState, "orders">>;

export const store = createStore({
  strict: process.env.NODE_ENV === "development",
  modules: {
    products,
    user,
    orders,
  },
});

export function useStore(): Store {
  return store as Store;
}
