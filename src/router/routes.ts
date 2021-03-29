import { RouteNames as R } from "./RouteNames";

export default [
  {
    path: "/",
    name: R.MAIN_LAYOUT,
    component: () => import(/* MainLayout */ "@/layouts/MainLayout/index.vue"),
    redirect: { name: "Main" },
    meta: {
      guard: "private",
    },
    children: [
      {
        path: "/",
        name: R.MAIN_PAGE,
        component: () => import(/* MainPage */ "@/pages/Main/index.vue"),
        // meta: {
        //   guard: 'private',
        // },
      },
      {
        path: "/profile",
        name: R.PROFILE,
        component: () => import(/* ProfilePage */ "@/pages/Profile/index.vue"),
        // meta: {
        //   guard: 'private',
        // },
      },
      {
        path: "/products",
        name: R.PRODUCTS,
        component: () => import(/* ProductsPage */ "@/pages/Products/index.vue"),
        // meta: {
        //   guard: 'private',
        // },
      },
      {
        path: "/categories",
        name: R.CATEGORIES,
        component: () => import(/* CategoriesPage */ "@/pages/Categories/index.vue"),
        // meta: {
        //   guard: 'private',
        // },
      },
      {
        path: "/orders",
        name: R.ORDERS,
        component: () => import(/* OrdersPage */ "@/pages/Orders/index.vue"),
        // meta: {
        //   guard: 'private',
        // },
      },
      {
        path: "/customers",
        name: R.CUSTOMERS,
        component: () => import(/* CustomersPage */ "@/pages/Customers/index.vue"),
        // meta: {
        //   guard: 'private',
        // },
      },
    ],
  },
  {
    path: "/sign-in",
    name: R.SIGN_IN,
    component: () => import(/* SignInPage */ "@/pages/SignIn/index.vue"),
    meta: {
      guard: "guest",
    },
  },
  {
    path: "/sign-up",
    name: R.SIGN_UP,
    component: () => import(/* SignUpPage */ "@/pages/SignUp/index.vue"),
    meta: {
      guard: "guest",
    },
  },
];
