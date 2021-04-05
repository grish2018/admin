import { Order } from "@/types/Order";

export type State = {
  orders: Order[];
};

export const state: State = {
  orders: [],
};
