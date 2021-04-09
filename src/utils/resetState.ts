import { RouteNames } from "@/router/RouteNames";
import { removeStorage } from "@/utils/storage";
import { MutationType as categoriesMutation } from "@/store/modules/Categories/MutationType";
import { MutationType as customersMutation } from "@/store/modules/Customers/MutationType";
import { MutationType as ordersMutation } from "@/store/modules/Orders/MutationType";
import { MutationType as productsMutation } from "@/store/modules/Products/MutationType";
import { MutationType as userMutation } from "@/store/modules/User/MutationType";
import { Store } from "@/store";
import { Router } from "vue-router";

const mutations = [categoriesMutation, customersMutation, ordersMutation, productsMutation, userMutation];

function commitResetMutations(store: Store) {
  for (const mutation of mutations) {
    store.commit(mutation.RESET_STATE);
  }
}

export function resetState({ store, router }: { store: Store; router: Router }) {
  removeStorage("token");
  removeStorage("storeId");
  commitResetMutations(store);
  router.push({ name: RouteNames.SIGN_IN });
}
