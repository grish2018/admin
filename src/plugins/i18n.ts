import { createI18n } from "vue-i18n";
import { en } from "./Translation/en";
import { ru } from "./Translation/ru";

export const i18n = createI18n({
  locale: "ru",
  messages: {
    en: en,
    ru: ru,
  },
});
