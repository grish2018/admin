import { State as CategoriesState } from "./modules/Categories/state";
import { State as ProductsState } from "./modules/Products/state";
import { State as UserState } from "./modules/User/state";
import { State as OrdersState } from "./modules/Orders/state";
import { State as CustomersState } from "./modules/Customers/state";

export type RootState = {
  categories: CategoriesState;
  products: ProductsState;
  user: UserState;
  orders: OrdersState;
  customers: CustomersState;
};
