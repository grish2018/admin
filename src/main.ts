import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import "@/assets/scss/index.scss";
import { i18n } from "@/plugins/i18n";
import { initInterceptors } from "@/plugins/Axios";

initInterceptors({ store, router });
createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .mount("#app");
