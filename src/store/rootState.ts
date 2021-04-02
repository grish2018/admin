import { State as ProductsState } from "./modules/Products/state";
import { State as UserState } from "./modules/User/state";
import { State as OrdersState } from "./modules/Orders/state";

export type RootState = {
  products: ProductsState;
  user: UserState;
  orders: OrdersState;
};
