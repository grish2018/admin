<template>
  <div>{{ $t("Customers") }}</div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { ActionType } from "@/store/modules/Customers/ActionType";
import { defineComponent, onBeforeMount } from "vue";
export default defineComponent({
  name: "CustomersPage",
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch(ActionType.GET_CUSTOMERS);
    });
    return {};
  },
});
</script>
