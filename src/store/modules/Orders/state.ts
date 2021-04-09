import { Order } from "@/types/Order";

export type State = {
  orders: Order[];
};

export const getDefaultState = () => {
  return {
    orders: [],
  };
};

export const state: State = { ...getDefaultState() };
