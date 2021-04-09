import { Order } from "@/types/Order";

export type State = {
  orders: Order[];
};

export const getDefaultState = (): State => {
  return {
    orders: [],
  };
};

export const state: State = getDefaultState();
