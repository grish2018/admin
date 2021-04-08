import { getDefaultState, useStore } from "@/store";
import { removeStorage } from "@/utils/storage";

export function resetState() {
  removeStorage("token");
  removeStorage("storeId");
  const store = useStore();
  store.replaceState(getDefaultState());
}
