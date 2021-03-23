import { RouteNames as R } from "./RouteNames";
import { NavigationGuard } from "@/types/Route";
import { RouteRecordNormalized } from "vue-router";

const isAuthenticated = () => localStorage.getItem("token");
const isPrivateRoute = (route: RouteRecordNormalized) =>
  route.meta.guard === "private";
const isGuestRoute = (route: RouteRecordNormalized) =>
  route.meta.guard === "guest";

let guard: NavigationGuard;
export default guard = (to, _from, next) => {
  if (to.matched.some(isPrivateRoute) && !isAuthenticated())
    return next({ name: R.SIGN_UP });
  if (to.matched.some(isGuestRoute) && isAuthenticated())
    return next({ name: R.MAIN_PAGE });
  next();
};
