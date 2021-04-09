import { createRouter, createWebHistory, Router } from "vue-router";
import routes from "./routes";
import guards from "./guards";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(guards);
export default router;

export function useRouter(): Router {
  return router as Router;
}
