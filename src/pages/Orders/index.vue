<template>
  <div class="orders">
    <div class="orders__title">
      {{ $t("Orders") }}
    </div>
    <loader-component v-if="loader" />
    <div v-else-if="orders.length === 0">
      <p>{{ $t("NoOrders") }}</p>
    </div>
    <ul v-else>
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
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import OrderCard from "./Components/OrderCard.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { getLocale } from "@/utils/storage";

export default defineComponent({
  name: "OrdersPage",
  components: { OrderCard, LoaderComponent },
  setup() {
    const store = useStore();
    const loader = ref(true);
    const orders = computed(() => store.state.orders.orders);
    const localeLanguage = getLocale();
    onBeforeMount(async () => {
      await store.dispatch(ActionType.GET_ORDERS);
      loader.value = false;
    });

    return { orders, loader, localeLanguage };
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
