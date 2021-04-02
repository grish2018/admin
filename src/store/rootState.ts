import { State as CategoriesState } from "./modules/Categories/state";
import { State as ProductsState } from "./modules/Products/state";
import { State as UserState } from "./modules/User/state";

export type RootState = {
  categories: CategoriesState;
  products: ProductsState;
  user: UserState;
};
