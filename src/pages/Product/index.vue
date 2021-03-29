<template>
  <div class="product">
    {{ route.params.id }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "ProductPage",
  setup() {
    const route = useRoute();
    return { route };
  },
});
</script>

<style lang="scss" scoped>
.product {
  height: 100%;
  display: flex;
  padding: 20px 20px;
  flex-direction: column;
}
</style>
