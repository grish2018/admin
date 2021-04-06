<template>
  <div class="orders">
    <loader-component v-if="loader" />
    <div class="orders__title">
      {{ $t("Orders") }}
    </div>
    <div v-if="orders.length === 0 && !loader">
      <p>{{ $t("NoOrders") }}</p>
    </div>
    <ul v-if="!loader">
      <li
        v-for="item in orders"
        :key="item.id">
        <order-card :order="item" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import { ActionType } from "@/store/modules/Orders/ActionType";
import { useStore } from "@/store";
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import OrderCard from "./Components/OrderCard.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";

export default defineComponent({
  name: "OrdersPage",
  components: { OrderCard, LoaderComponent },
  setup() {
    const store = useStore();
    const loader = ref(true);
    const orders = computed(() => store.state.orders.orders);
    onBeforeMount(async () => {
      await store.dispatch(ActionType.GET_ORDERS);
      loader.value = false;
    });

    return { orders, loader };
  },
});
</script>

<style lang="scss">
.orders {
  width: 100%;
  margin: 10px 10px;
  position: relative;
  ul {
    list-style: none;
  }
}
.orders{
  &__title {
    padding: 10px 10px;
  }
}
</style>
