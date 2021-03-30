import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  locale: "ru",
  messages: {
    en: {
      message: {
        Catalog: "Catalog",
        Products: "Products",
        Categories: "Categories",
        Sales: "Sales",
        Orders: "Orders",
        Customers: "Customers",
        logOff: "Log off",
        Showcase: "Showcase",
        Cancel: "Cancel",
        Confirm: "Confirm",
        Profile: "Profile",
        SelectAllProducts: "Select all products",
        CreateProduct: "Create product",
      },
    },
    ru: {
      message: {
        Catalog: "Каталог",
        Products: "Товары",
        Categories: "Категории",
        Sales: "Продажи",
        Orders: "Заказы",
        Customers: "Покупатели",
        logOff: "Выйти",
        Showcase: "Витрина",
        Cancel: "Отменить",
        Confirm: "Вставить",
        Profile: "Профиль",
        SelectAllProducts: "Выбрать все продукты",
        CreateProduct: "Создать продукт",
      },
    },
  },
});
