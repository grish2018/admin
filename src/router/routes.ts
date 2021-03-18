import { RouteNames as R } from "./routeNames";

export default [
  {
    path: "/",
    name: R.MAIN_LAYOUT,
    component: () => import(/* MainLayout */ "@/layouts/MainLayout/index.vue"),
    redirect: { name: "Main" },
    children: [
      {
        path: "/",
        name: R.MAIN_PAGE,
        component: () => import(/* MainPage */ "@/pages/Main/index.vue")
      },
      {
        path: "/profile",
        name: R.PROFILE,
        component: () => import(/* ProfilePage */ "@/pages/Profile/index.vue")
      },
      {
        path: "/products",
        name: R.PRODUCTS,
        component: () => import(/* ProductsPage */ "@/pages/Products/index.vue")
      }
    ]
  }
];
