<template>
  <div></div>
</template>

<script lang="ts">
import { ActionType } from "@/store/modules/Products/ActionType";
import { useStore } from "@/store";
import { defineComponent, onBeforeMount } from "vue";
export default defineComponent({
  name: "ProductsPage",
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch(ActionType.GET_PRODUCTS);
      console.log(store);
    });
    return { store };
  }
});
</script>
