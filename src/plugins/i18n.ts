import { setStorage } from "@/utils/storage";
import { createI18n } from "vue-i18n";
import { languages } from "@/plugins/Translation/languages";

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
});

function setI18Language(lang: string) {
  i18n.global.locale.value = lang;
  setStorage("locale", lang);
  return lang;
}

export function loadedLanguagesAsync(lang: string) {
  if (i18n.global.locale.value === lang) {
    return Promise.resolve(setI18Language(lang));
  }
  if (!languages.includes(lang)) {
    lang = "en";
  }

  return import(/* webpackChunkName: "lang-[request]" */`@/plugins/Translation/${lang}`).then(
    (messages) => {
      i18n.global.setLocaleMessage(lang, messages[lang]);
      return setI18Language(lang);
    }
  );
}
