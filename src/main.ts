import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import "@/assets/scss/index.scss";
import { i18n, loadedLanguagesAsync } from "@/plugins/i18n";
import { initInterceptors } from "@/plugins/Axios";
import UI from "@/components/UI";
import VueClickAway from "vue3-click-away";
import { getStorage } from "@/utils/storage";

initInterceptors({ store, router });

const lang = getStorage("locale") || "ru";

loadedLanguagesAsync(lang).then(() => {
  createApp(App)
    .use(store)
    .use(router)
    .use(i18n)
    .use(UI)
    .use(VueClickAway)
    .mount("#app");
});
