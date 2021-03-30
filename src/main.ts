import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import "@/assets/scss/index.scss";
import { initInterceptors } from "@/plugins/Axios/axios";
import { i18n } from "@/plugins/i18n";

initInterceptors({ store, router });
createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .mount("#app");
