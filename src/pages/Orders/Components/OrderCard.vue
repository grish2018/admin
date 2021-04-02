<template>
  <div class="order-card">
    <div class="order-card__header">
      <div class="order-card__checkbox">
        <input type="checkbox">
        <p class="order-date__text">
          Data
        </p>
      </div>
      <p class="order-date__price">
        ${{ order.products.reduce((sum, product) => sum + product.price, 0) }}
      </p>
    </div>
    <div class="order-card__content">
      <p class="order-card__status">
        {{ $t(order.paymentStatus) }}
      </p>
      <p class="order-card__mail">
        {{ order.customerEmail }}
      </p>
      <p class="order-card__payment">
        {{ $t(order.fulfillmentStatus) }}
      </p>
      <div class="order-quantity-goods">
        <p
          :class="{active: isShowing}"
          @click="isShowing = !isShowing">
          {{ $t("NumberOfProducts") }}: {{ order.products.length }}
          <svg-icon
            v-if="order.products.length"
            name="down-arrow-grey"
            fill="grey" />
        </p>
        <product
          v-if="isShowing"
          :products="order.products" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { RouteNames } from "@/router/RouteNames";
import { Order } from "@/types/Order";
import Product from "@/pages/Orders/Components/Product.vue";
export default defineComponent({
  name: "OrderCard",
  components: { Product },
  props: {
    order: {
      type: Object as () => Order,
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
    const isShowing = ref(false);
    return {
      RouteNames,
      isShowing,
    };
  },
});
</script>

<style lang="scss">
.order{
  &-card {
    width: 600px;
    background-color: #ffffff;
    padding: 10px 10px;
    margin-top: 5px;
  }
  &-card__checkbox {
    display: flex;
    align-items: center;
    input {
      margin-top: -3px;
      margin-right: 20px;
    }
  }
  &-card__header {
    display: flex;
    justify-content: space-between;
  }
  &-card__content {
    margin-top: 10px;
    padding-left: 30px;
  }
  &-card__mail {
    margin-top: 5px;
  }
  &-card__payment {
    margin-top: 5px;
  }
  &-quantity-goods {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    margin-top: 5px;
    p {
      cursor: pointer;
    }
    svg {
      transition: 0.3s;
      width: 15px;
      height: 15px;
    }
    .active {
      svg {
        transform: rotate(180deg);
      }
    }
  }
  &-arrow-list {
    cursor: pointer;
  }
}
</style>
