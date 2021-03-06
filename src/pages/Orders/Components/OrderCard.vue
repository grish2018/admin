<template>
  <div class="order-card">
    <div class="order-card__header">
      <div class="order-card__checkbox">
        <input type="checkbox">
        <p class="order-date__text">
          #{{ order.number }},
          {{ dateData }}
        </p>
      </div>
      <p class="order-date__price">
        ${{ order.total }}
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
import { defineComponent, ref } from "vue";
import { RouteNames } from "@/router/RouteNames";
import { Order } from "@/types/Order";
import ProductOrderCard from "./ProductOrderCard.vue";
import { dateTime } from "@/utils/dateTime";

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
    localeLanguage: {
      type: String,
      default: () => {
        return "ru";
      },
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isShowing = ref(false);
    const dateData = dateTime(props.localeLanguage, props.order.created);
    return {
      RouteNames,
      isShowing,
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
