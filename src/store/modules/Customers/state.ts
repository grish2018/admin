import { Customers } from "@/types/Customers";

export type State = {
  customers: Customers[];
};

export const state: State = {
  customers: [],
};
