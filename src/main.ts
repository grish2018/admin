import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";

import "@/assets/scss/index.scss";
import { ActionType } from "./store/modules/Products/ActionType";
store.dispatch(ActionType.GET_PRODUCTS);
console.log(store);

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
