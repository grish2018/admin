import { RouteLocationNormalized, RouteRecordNormalized } from "vue-router";

type Meta = {
  guard?: string;
};

export interface Route extends RouteRecordNormalized {
  meta: Meta;
}

export interface RouteLocationNormalizedWithMeta
  extends RouteLocationNormalized {
  meta: Meta;
}
