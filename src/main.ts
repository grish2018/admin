import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import "@/assets/scss/index.scss";
import { initInterceptors } from "@/plugins/axios/axios";

initInterceptors({ store, router });
createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
