import { createStore } from "vuex";
import { state as categoriesState } from "./modules/Categories/state";
import { state as productsState } from "./modules/Products/state";
import { state as userState } from "./modules/User/state";
import { state as ordersState } from "./modules/Orders/state";
import { state as customersState } from "./modules/Customers/state";
import { store as products, ProductsStore } from "@/store/modules/Products";
import { store as categories, CategoriesStore } from "@/store/modules/Categories";
import { store as customers, CustomersStore } from "@/store/modules/Customers";
import { store as user, UserStore } from "@/store/modules/User";
import { store as orders, OrdersStore } from "@/store/modules/Orders";
import { RootState } from "./rootState";

export type Store = CustomersStore<Pick<RootState, "customers">> &
  CategoriesStore<Pick<RootState, "categories">> &
  ProductsStore<Pick<RootState, "products">> &
  UserStore<Pick<RootState, "user">> &
  OrdersStore<Pick<RootState, "orders">>;

export const store = createStore({
  strict: process.env.NODE_ENV === "development",
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

export const defaultState = {
  products: { ...productsState },
  categories: { ...categoriesState },
  user: { ...userState },
  orders: { ...ordersState },
  customers: { ...customersState },
};
