import { State as ProductsState } from "./modules/Products/state";
import { State as UserState } from "./modules/User/state";

export type RootState = {
  products: ProductsState;
  user: UserState;
};
