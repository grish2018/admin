import { Customer } from "@/types/Customer";

export type State = {
  customers: Customer[];
};

export const getDefaultState = () => {
  return {
    customers: [],
  };
};

export const state: State = { ...getDefaultState() };
