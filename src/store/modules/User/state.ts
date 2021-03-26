import { ErrorMessage } from "@/types/ErrorMessage";

function getToken(): string | null {
  return window.localStorage.getItem("token");
}
function getStoreId(): string | null {
  return window.localStorage.getItem("storeId");
}

export type State = {
  user: {};
  token: string | null;
  storeId: string | null;
  profile: {} | null;
  error: ErrorMessage;

};

export const state: State = {
  user: {},
  token: getToken(),
  storeId: getStoreId(),
  profile: null,
  error: {},
};
