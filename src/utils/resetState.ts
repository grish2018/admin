import { RouteNames } from "@/router/RouteNames";
import { removeStorage } from "@/utils/storage";
import { useStore } from "@/store";
import { useRouter } from "@/router";
import { MutationType } from "@/store/MutationType";

function commitResetMutations() {
  const store = useStore();
  store.commit(MutationType.RESET_STATE);
}

export function resetState() {
  const router = useRouter();
  removeStorage("token");
  removeStorage("storeId");
  commitResetMutations();
  router.push({ name: RouteNames.SIGN_IN });
}
