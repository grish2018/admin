<template>
  <div class="orders">
    <div class="order-title">
      {{ $t("Orders") }}
    </div>
    <ul>
      <li
        v-for="item in orders"
        :key="item.id">
        <order-card
          :order="item" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import { ActionType } from "@/store/modules/Orders/ActionType";
import { useStore } from "@/store";
import { computed, defineComponent, onBeforeMount } from "vue";
import OrderCard from "./Components/OrderCard.vue";

export default defineComponent({
  name: "OrdersPage",
  components: { OrderCard },
  setup() {
    const store = useStore();
    const orders = computed(() => store.state.orders.orders);
    onBeforeMount(() => {
      store.dispatch(ActionType.GET_ORDERS);
    });

    return { orders };
  },
});
</script>

<style lang="scss">
.orders {
  width: 100%;
  padding: 10px 10px;
}
.order{
  &-title {
    padding: 10px 10px;
  }
}
</style>
