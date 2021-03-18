import { ActionTree } from "vuex";
import { ActionType } from "./ActionType";
import { MutationType } from "./MutationType";
import {
  ProductsActionsTypes,
  ProductsStateTypes,
  IRootState
} from "@/store/types";
import axios from "@/plugins/axios";

export const actions: ActionTree<ProductsStateTypes, IRootState> &
  ProductsActionsTypes = {
  async [ActionType.GET_PRODUCTS]({ commit }): Promise<void> {
    const res = await axios.get("/products");
    commit(MutationType.SET_PRODUCTS, res.data);
  }
};
