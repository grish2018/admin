import { RouteNames as R } from "./RouteNames";
import { Route } from "@/types/Route";

const isAuthenticated = () => localStorage.getItem("token");
const isPrivateRoute = (route: Route) => route.meta.guard === "private";
const isGuestRoute = (route: Route) => route.meta.guard === "guest";

export default (to: any, from: any, next: any) => {
  if (to.matched.some(isPrivateRoute) && !isAuthenticated())
    return next({ name: R.SIGN_UP });
  if (to.matched.some(isGuestRoute) && isAuthenticated())
    return next({ name: R.MAIN_PAGE });
  next();
};
