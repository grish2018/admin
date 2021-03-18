import {
  createStore
  // Store as VuexStore,
  // CommitOptions,
  // DispatchOptions
} from "vuex";

import {
  store as products,
  ProductsStore,
  State as ProductsState
} from "@/store/modules/Products";

export type RootState = {
  products: ProductsState;
};

export type Store = ProductsState<Pick<RootState, "products">>;

export const store = createStore({
  modules: {
    products
  }
});

// export type Store = Omit<
//   VuexStore<State>,
//   "getters" | "commit" | "dispatch"
// > & {
//   commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
//     key: K,
//     payload: P,
//     options?: CommitOptions
//   ): ReturnType<Mutations[K]>;
// } & {
//   dispatch<K extends keyof Actions>(
//     key: K,
//     payload: Parameters<Actions[K]>[1],
//     options?: DispatchOptions
//   ): ReturnType<Actions[K]>;
// } & {
//   getters: {
//     [K in keyof Getters]: ReturnType<Getters[K]>;
//   };
// };

export function useStore(): Store {
  return store as Store;
}
