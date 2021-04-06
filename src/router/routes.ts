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
      },
      {
        path: "/profile",
        name: R.PROFILE,
        component: () => import(/* ProfilePage */ "@/pages/Profile/index.vue"),
      },
      {
        path: "/products",
        name: R.PRODUCTS,
        component: () => import(/* ProductsPage */ "@/pages/Products/index.vue"),
      },
      {
        path: "/products/new",
        name: R.CREATE_PRODUCTS,
        component: () => import(/* CreateProductPage */ "@/pages/CreateProduct/index.vue"),
      },
      {
        path: "/products/edit/:id",
        name: R.EDIT_PRODUCTS,
        component: () => import(/* EditProductPage */ "@/pages/CreateProduct/index.vue"),
      },
      {
        path: "/categories",
        name: R.CATEGORIES,
        component: () => import(/* CategoriesPage */ "@/pages/Categories/index.vue"),
        children: [
          {
            path: "/categories/new",
            name: R.CREATE_CATEGORY,
            component: () => import(/* CreateCategoryPage */ "@/pages/CreateCategory/index.vue"),
          },
          {
            path: "/categories/:id",
            name: R.CATEGORY,
            component: () => import(/* EditCategoryPage */ "@/pages/Category/index.vue"),
            redirect: { name: R.EDIT_CATEGORY },
            children: [
              {
                path: "/categories/:id/edit",
                name: R.EDIT_CATEGORY,
                component: () => import(/* EditCategoryPage */ "@/pages/EditCategory/index.vue"),
              },
              {
                path: "/categories/:id/addSubCategory",
                name: R.ADD_SUB_CATEGORY,
                component: () => import(/* EditCategoryPage */ "@/pages/EditCategory/index.vue"),
              },
              {
                path: "/categories/:id/products",
                name: R.CATEGORY_PRODUCTS,
                component: () => import(/* CategoryProductsPage */ "@/pages/CategoryProducts/index.vue"),
              },
            ],
          },
        ],
      },
      {
        path: "/orders",
        name: R.ORDERS,
        component: () => import(/* OrdersPage */ "@/pages/Orders/index.vue"),
      },
      {
        path: "/customers",
        name: R.CUSTOMERS,
        component: () => import(/* CustomersPage */ "@/pages/Customers/index.vue"),
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
  {
    path: "/product/:id",
    name: R.PRODUCT,
    component: () => import(/* ProductPage */ "@/pages/Product/index.vue"),
  },
  { path: "/:pathMatch(.*)*", name: "not-found", redirect: { name: R.MAIN_PAGE } },
  { path: "/:pathMatch(.*)", name: "bad-not-found", redirect: { name: R.MAIN_PAGE } },
];
