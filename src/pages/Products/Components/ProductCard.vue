<template>
  <div class="product-card">
    <div class="product-card__content">
      <input
        :checked="checked"
        type="checkbox"
        class="product-card__input"
        @change="$emit('selectItem', $event, product)">
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
        <span><b>Название:</b> {{ product.title }}</span>
        <span><b>Цена:</b> {{ product.price }}</span>
      </div>
    </div>
    <router-link
      class="product-card__link"
      :to="{
        name: RouteNames.CREATE_PRODUCTS,
        params: { mode: 'edit' },
        query: { id: product.id },
      }">
      Редактировать продукт
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
  justify-content: space-between;
  &__content {
    display: flex;
    align-items: center;
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
  &__link {
    height: 30px;
    width: fit-content;
    padding: 0px 8px;
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
