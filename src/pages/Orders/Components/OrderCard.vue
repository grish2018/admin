<template>
  <div class="order-card">
    <div class="order-card__header">
      <div class="order-checkbox">
        <input type="checkbox">
        <p class="order-date-text">
          Data
        </p>
      </div>
      <p class="order-price">
        ${{ order.products.reduce((sum, product) => sum + product.price, 0) }}
      </p>
    </div>
    <div class="order-card__content">
      <p class="order-status">
        {{ $t(order.paymentStatus) }}
      </p>
      <p class="order-mail">
        {{ order.customerEmail }}
      </p>
      <p class="order-payment">
        {{ $t(order.fulfillmentStatus) }}
      </p>
      <div class="order-quantity-goods">
        <p
          :class="{active: isShowing}"
          @click="isShowing = !isShowing">
          {{ $t("NumberOfProducts") }}: {{ order.products.length }}
          <svg
            v-if="order.products.length"
            width="15"
            height="15"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 491.996 491.996"
            fill="grey">
            <path d="M484.132 124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86-7.208 0-13.964 2.792-19.036 7.86l-183.84 183.848L62.056 108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968 2.788-19.036 7.856l-16.12 16.128c-10.496 10.488-10.496 27.572 0 38.06l219.136 219.924c5.064 5.064 11.812 8.632 19.084 8.632h.084c7.212 0 13.96-3.572 19.024-8.632l218.932-219.328c5.072-5.064 7.856-12.016 7.864-19.224 0-7.212-2.792-14.068-7.864-19.128z" />
          </svg>
        </p>
        <ul
          v-if="isShowing"
          class="order-list-products">
          <li
            v-for="product in order.products"
            :key="product.id">
            <p>{{ product.title }}</p>
            <div class="order-list-basket">
              <p class="order-list-count">
                {{ product.count }} X
              </p>
              <p class="order-list-price">
                ${{ product.price }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { RouteNames } from "@/router/RouteNames";
import { Order } from "@/types/Order";
export default defineComponent({
  name: "OrderCard",
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
  &-checkbox {
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
  &-mail {
    margin-top: 5px;
  }
  &-payment {
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
  &-list-products {
    list-style: none;
    li {
      width: 100px;
      background-color: #dedcdc;
      margin-top: 5px;
      padding: 5px 5px;
    }
  }
  &-list-basket {
    display: flex;
  }
  &-list-price {
    margin-left: 5px;
  }
}
</style>
