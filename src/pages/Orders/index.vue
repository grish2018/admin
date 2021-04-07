<template>
  <div class="orders">
    <div class="orders__title">
      {{ $t("Orders") }}
    </div>
    <ul>
      <li
        v-for="item in orders"
        :key="item.id">
        <order-card
          :order="item"
          :locale-language="localeLanguage" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import { ActionType } from "@/store/modules/Orders/ActionType";
import { useStore } from "@/store";
import { computed, defineComponent, onBeforeMount } from "vue";
import OrderCard from "./Components/OrderCard.vue";
import { getLocale } from "@/utils/storage";

export default defineComponent({
  name: "OrdersPage",
  components: { OrderCard },
  setup() {
    const store = useStore();
    const orders = computed(() => store.state.orders.orders);
    const localeLanguage = getLocale();
    onBeforeMount(() => {
      store.dispatch(ActionType.GET_ORDERS);
    });

    return { orders, localeLanguage };
  },
});
</script>

<style lang="scss">
.orders {
  width: 100%;
  padding: 10px 10px;
}
.orders{
  &__title {
    padding: 10px 10px;
  }
}
</style>
