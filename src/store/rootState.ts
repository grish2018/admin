import { State as ProductsState } from "./modules/Products/state";
import { State as UserState } from "./modules/User/state";
import { State as CustomersState } from "./modules/Customers/state";

export type RootState = {
  products: ProductsState;
  user: UserState;
  customers: CustomersState;
};
