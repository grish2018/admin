<template>
  <div class="order-card">
    <div class="order-card__header">
      <div class="order-card__checkbox">
        <input type="checkbox">
        <p class="order-date__text">
          {{ order.number }},
          {{ dateData }}
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
          :class="{'order-card__show-button--active': isShowing}"
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
import { Order, ProductData } from "@/types/Order";
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
      return props.order.products.reduce((sum: number, product: ProductData) => sum + product.price, 0);
    });
    const dateData = new Intl.DateTimeFormat(String(localStorage.getItem("locale")), {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "numeric",
      hour12: true,
    }).format(props.order.created).replace("г.,", "");
    return {
      RouteNames,
      isShowing,
      totalAmount,
      dateData,
    };
  },
});
</script>

<style lang="scss">
.order-card {
  width: 600px;
  background-color: #ffffff;
  padding: 10px 10px;
  margin-top: 5px;
  &__checkbox {
    display: flex;
    align-items: center;
    input {
      margin-top: -3px;
      margin-right: 20px;
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__content {
    margin-top: 10px;
    padding-left: 30px;
  }
  &__mail {
    margin-top: 5px;
  }
  &__payment {
    margin-top: 5px;
  }
  &__quantity-products {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    margin-top: 5px;
  }
  &__show-button {
    display: flex;
    align-items: center;
    background: none;
    outline: none;
    span {
      font-size: 15px;
    }
    svg {
      transition: 0.3s;
      width: 15px;
      height: 15px;
      margin-left: 10px;
    }
    &--active {
      svg {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
