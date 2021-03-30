<template>
  <div class="product-card">
    <input
      :checked="checked"
      type="checkbox"
      class="product-card__input"
      @change="$emit('selectItem', $event, product)">
    <router-link
      :to="{
        name: RouteNames.EDIT_PRODUCTS,
        params: { id: product.id },
      }"
      class="product-card__content">
      <img
        v-if="product.img"
        src=""
        alt="">
      <div
        v-else
        class="product-card__image">
        {{ product.title[0] }}
      </div>
      <div class="product-card__description">
        <span><b>{{ $t("message.Title") }}:</b> {{ product.title }}</span>
        <span><b>{{ $t("message.Price") }}:</b> {{ product.price }}</span>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteNames } from "@/router/RouteNames";
import { Product } from "@/types/Product";
export default defineComponent({
  name: "ProductCard",
  props: {
    product: {
      type: Object as () => Product,
      default: () => {
        return {};
      },
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      RouteNames,
    };
  },
});
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  height: 50px;
  background: white;
  margin-bottom: 10px;
  align-items: center;
  padding: 0px 10px;
  &__content {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
  }
  &__input {
    margin-right: 10px;
  }
  &__image {
    width: 40px;
    height: 40px;
    background: var(--select-navigation-color);
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    margin-right: 20px;
    color: white;
  }
  &__description {
    display: flex;
    flex-direction: column;
  }
}
</style>
