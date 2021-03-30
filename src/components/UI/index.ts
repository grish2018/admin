import { App } from "vue";
import SvgIcon from "./SvgIcon.vue";

export default {
  install(Vue: App) {
    Vue.component("SvgIcon", SvgIcon);
  },
};
