import { CommitOptions, createStore } from "vuex";
import { store as products, ProductsStore } from "@/store/modules/Products";
import { store as categories, CategoriesStore } from "@/store/modules/Categories";
import { store as customers, CustomersStore } from "@/store/modules/Customers";
import { store as user, UserStore } from "@/store/modules/User";
import { store as orders, OrdersStore } from "@/store/modules/Orders";
import { RootState } from "./rootState";
import { Mutations, mutations } from "./mutations";

export type Store = CustomersStore<Pick<RootState, "customers">> &
  CategoriesStore<Pick<RootState, "categories">> &
  ProductsStore<Pick<RootState, "products">> &
  UserStore<Pick<RootState, "user">> &
  OrdersStore<Pick<RootState, "orders">> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
      key: K,
      payload?: P,
      options?: CommitOptions
    ): ReturnType<Mutations[K]>;
  };

export const store = createStore({
  strict: process.env.NODE_ENV === "development",
  mutations,
  modules: {
    categories,
    products,
    user,
    orders,
    customers,
  },
});

export function useStore(): Store {
  return store as Store;
}
