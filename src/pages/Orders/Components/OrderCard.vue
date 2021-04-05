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
        ${{ totalAmount }}
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
      <div class="order-card__quantity-products">
        <button
          class="order-card__show-button"
          :class="{'active': isShowing}"
          @click="isShowing = !isShowing">
          <span>{{ $t("NumberOfProducts") }}: {{ order.products.length }}</span>
          <svg-icon
            v-if="order.products.length"
            name="down-arrow-grey" />
        </button>
        <product-order-card
          v-if="isShowing"
          :products="order.products" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { RouteNames } from "@/router/RouteNames";
import { Order } from "@/types/Order";
import { Product } from "@/types/Product";
import ProductOrderCard from "./ProductOrderCard.vue";
export default defineComponent({
  name: "OrderCard",
  components: { ProductOrderCard },
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
  setup(props) {
    const isShowing = ref(false);
    const totalAmount = computed(() => {
      return props.order.products.reduce((sum: number, product: Product) => sum + product.price, 0);
    });
    return {
      RouteNames,
      isShowing,
      totalAmount,
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
  &-card__quantity-products {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    margin-top: 5px;
    span {
      font-size: 15px;
    }
    svg {
      transition: 0.3s;
      width: 15px;
      height: 15px;
      margin-left: 10px;
    }
    .active {
      svg {
        transform: rotate(180deg);
      }
    }
  }
  &-card__show-button {
    display: flex;
    align-items: center;
    background: none;
    outline: none;
  }
  &-arrow-list {
    cursor: pointer;
  }
}
</style>
