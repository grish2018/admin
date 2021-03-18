import { ActionContext } from "vuex";
import { MutationType as ProductsMTypes } from "./modules/Products/MutationType";
import { ActionType as ProductsATypes } from "./modules/Products/ActionType";

export interface RootState {
  root: boolean;
  version: string;
}

export interface ProductsStateTypes {
  products: [];
}

export type ProductsMutationsTypes<S = ProductsStateTypes> = {
  [ProductsMTypes.SET_PRODUCTS](state: ProductsStateTypes, products: []): void;
};

export type AugmentedActionContext = {
  commit<K extends keyof ProductsMutationsTypes>(
    key: K,
    payload: Parameters<ProductsMutationsTypes[K]>[1]
  ): ReturnType<ProductsMutationsTypes[K]>;
} & Omit<ActionContext<ProductsStateTypes, RootState>, "commit">;

export interface ProductsActionsTypes {
  [ProductsATypes.GET_PRODUCTS](
    { commit }: AugmentedActionContext,
    payload: number
  ): Promise<void>;
}
