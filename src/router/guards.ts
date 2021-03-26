import { RouteNames as R } from "./RouteNames";
import { Route, RouteLocationNormalizedWithMeta } from "@/types/Route";
import { NavigationGuardNext } from "vue-router";
import { store } from "@/store/index";

const isAuthenticated = () => {
  const token = store.state.user.token;
  const storeId = store.state.user.storeId;
  if (token && storeId) {
    return true;
  } else {
    return false;
  }
};
const isPrivateRoute = (route: Route) => route.meta.guard === "private";
const isGuestRoute = (route: Route) => route.meta.guard === "guest";

export default (
  to: RouteLocationNormalizedWithMeta,
  from: RouteLocationNormalizedWithMeta,
  next: NavigationGuardNext
) => {
  if (to.matched.some(isPrivateRoute) && !isAuthenticated()) {
    if (from.name === R.SIGN_IN) { return next(false); } else { return next({ name: R.SIGN_UP }); }
  }
  if (to.matched.some(isGuestRoute) && isAuthenticated()) {
    return next({ name: R.MAIN_PAGE });
  } else next();
};
