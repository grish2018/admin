<template>
  <div class="product-card">
    <div class="product-card__content-wrapper">
      <input
        :value="product"
        :checked="checked"
        type="checkbox"
        class="product-card__content-wrapper-input"
        @change="$emit('selectItem', $event, product)">
      <img
        v-if="product.img"
        src=""
        alt="">
      <div
        v-else
        class="product-card__content-wrapper-image">
        {{ product.title[0] }}
      </div>
      <div class="product-card__content-wrapper-description">
        <span><b>Name:</b> {{ product.title }}</span>
        <span><b>Price:</b> {{ product.price }}</span>
      </div>
    </div>
    <router-link
      class="product-card__link"
      :to="{ name: RouteNames.PRODUCT, params: { id: product.id } }">
      View product
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteNames } from "@/router/RouteNames";
export default defineComponent({
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      default: () => {
        return {};
      },
    },
    checked: {
      type: Boolean,
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
  justify-content: space-between;
  &__content-wrapper {
    display: flex;
    align-items: center;
    &-input {
      margin-right: 10px;
    }
    &-image {
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
    &-description {
      display: flex;
      flex-direction: column;
    }
  }
  &__link {
    height: 30px;
    width: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    text-decoration: none;
    background: rgba(25, 165, 39, 0.8);
    color: white;
  }
}
</style>
