import { getStorage } from "@/utils/storage";
import { createI18n } from "vue-i18n";
import { en } from "./Translation/en";
import { ru } from "./Translation/ru";

const locale = getStorage("locale");
export const i18n = createI18n({
  locale: locale || "ru",
  messages: {
    en: en,
    ru: ru,
  },
});
