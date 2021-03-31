import { getStorage, setStorage } from "@/utils/storage";
import { createI18n } from "vue-i18n";
import { languages } from "@/plugins/Translation/languages";
// import { en } from "./Translation/en";
// import { ru } from "./Translation/ru";
//
// const locale = getStorage("locale");
// export const i18n = createI18n({
//   locale: locale || "ru",
//   messages: {
//     en: en,
//     ru: ru,
//   },
// });

export const i18n = createI18n({
  locale: "",
});
const locale = getStorage("locale") || "en";
const loadedLanguages: any[] = [];

function setI18Language(lang: string) {
  i18n.global.locale = lang;
  setStorage("locale", lang);
  return lang;
}

export function loadedLanguagesAsync(lang: string) {
  if (i18n.global.locale === lang) {
    return Promise.resolve(setI18Language(lang));
  }
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18Language(lang));
  }
  if (!languages.includes(lang)) {
    lang = "en";
  }

  return import(/* webpackChunkName: "lang-[request]" */`@/plugins/Translation/${lang}`).then(
    (messages) => {
      i18n.global.setLocaleMessage(lang, messages[lang]);
      loadedLanguages.push(lang);
      return setI18Language(lang);
    }
  );
}

loadedLanguagesAsync(locale);
