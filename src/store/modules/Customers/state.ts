import { Customer } from "@/types/Customer";

export type State = {
  customers: Customer[];
};

export const state: State = {
  customers: [],
};
