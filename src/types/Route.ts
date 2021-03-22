type Meta = {
  guard?: string;
};

export interface Route {
  path: string;
  name: string;
  redirect: Record<string, any>;
  children?: Record<string, any>[];
  meta: Meta;
}
