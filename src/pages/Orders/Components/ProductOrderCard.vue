<template>
  <ul
    class="order-list__products">
    <li
      v-for="product in products"
      :key="product.id">
      <p>{{ product.title }}</p>
      <div class="order-list__basket">
        <p class="order-list__count">
          {{ product.count }} X
        </p>
        <p class="order-list__price">
          ${{ product.price }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteNames } from "@/router/RouteNames";
import { Order } from "@/types/Order";
export default defineComponent({
  name: "ProductOrderCard",
  props: {
    products: {
      type: Object as () => Order,
      default: () => {
        return {};
      },
    },
  },
  setup() {
    return {
      RouteNames,
    };
  },
});
</script>

<style lang="scss">
.order{
  &-list__products {
    list-style: none;
    li {
      width: 100px;
      background-color: #dedcdc;
      margin-top: 5px;
      padding: 5px 5px;
    }
  }
  &-list__basket {
    display: flex;
  }
  &-list__price {
    margin-left: 5px;
  }
}
</style>
