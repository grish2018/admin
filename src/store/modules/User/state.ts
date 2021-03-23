export type State = {
  user: {};
  token: string | null;
  storeId: string | null;
  profile: {} | null;
};

export const state: State = {
  user: {},
  token: null,
  storeId: null,
  profile: null
};
