<template>
  <div class="order-card">
    <div class="order-card-header">
      <div class="order-checkbox">
        <input type="checkbox">
        <p class="order-date-text">
          {{ order.fulfillmentStatus }}
        </p>
      </div>
      <p class="order-price">
        $120
      </p>
    </div>
    <div class="order-card-content">
      <div class="order-status">
        <p>
          Ожидает оплаты
        </p>
        <p>
          Ожидает обработчики
        </p>
      </div>
      <p class="order-mail">
        customer@some.ee
      </p>
      <p class="order-payment">
        Оплата по телефону
      </p>
      <p class="order-number-goods">
        Товаров: 3
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
    return {
      RouteNames,
    };
  },
});
</script>

<style lang="scss" scoped>
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
  &-card-header {
    display: flex;
    justify-content: space-between;
  }
  &-card-content {
    margin-top: 10px;
    padding-left: 30px;
  }
  &-status {
    display: flex;
    p {
      margin-right: 30px;
    }
  }
  &-mail {
    margin-top: 5px;
  }
  &-payment {
    margin-top: 5px;
  }
  &-number-goods {
    margin-top: 5px;
  }
}
</style>
