import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import guards from "./guards";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(guards);
export default router;
