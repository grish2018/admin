import { ComponentPublicInstance } from "@vue/runtime-core";
import {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationRaw
} from "vue-router";

type NavigationGuardNextCallback = (vm: ComponentPublicInstance) => any;
type NavigationGuardReturn =
  | void
  | Error
  | RouteLocationRaw
  | boolean
  | NavigationGuardNextCallback;
export interface NavigationGuard {
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): NavigationGuardReturn | Promise<NavigationGuardReturn>;
}
