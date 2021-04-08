function getToken(): string | null {
  return window.localStorage.getItem("token");
}
function getStoreId(): string | null {
  return window.localStorage.getItem("storeId");
}

interface User {
  account: {};
  general: {};
}

export type State = {
  user: User;
  errorMessage: string;
  general: object;
  token: string | null;
  storeId: string | null;
  profile: {} | null;
};

export const state: State = {
  user: { account: {}, general: {} },
  errorMessage: "",
  general: {},
  token: getToken(),
  storeId: getStoreId(),
  profile: null,
};
