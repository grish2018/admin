<template>
  <div class="product">
    {{ route }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "ProductPage",
  setup() {
    const route = useRouter();
    return { route };
  },
});
</script>

<style lang="scss" scoped>
.product {
}
</style>
