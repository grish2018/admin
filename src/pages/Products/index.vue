<template>
  <div class="products">
    <div class="products__checkbox-wrapper">
      <input
        id="selectAll"
        type="checkbox"
        @change="selectAll($event)">
      <label for="selectAll">
        Select all products
      </label>
    </div>
    <ul class="products__list">
      <li
        v-for="item in products"
        :key="item.id"
        class="products__list-item">
        <div class="products__list-item--content-wrapper">
          <input
            :value="item"
            :checked="itemChecked(item.id)"
            type="checkbox"
            class="products__list-item--content-wrapper-input"
            @change="addItem($event, item)">
          <img
            v-if="item.img"
            src=""
            alt="">
          <div
            v-else
            class="products__list-item--content-wrapper-image">
            {{ item.title[0] }}
          </div>
          <div class="products__list-item--content-wrapper-description">
            <span><b>Name:</b> {{ item.title }}</span>
            <span><b>Price:</b> {{ item.price }}</span>
          </div>
        </div>
        <router-link
          class="products__list-item--link"
          :to="{ name: RouteNames.PRODUCT, params: { id: item.id } }">
          View product
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ActionType } from "@/store/modules/Products/ActionType";
import { useStore } from "@/store";
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { RouteNames } from "@/router/RouteNames";
import { Product } from "@/types/Product";
export default defineComponent({
  name: "ProductsPage",
  setup() {
    const checkedProducts: { value: { id: number }[] } = ref([]);
    const store = useStore();
    const checkAll = ref(false);
    const products = computed(() => store.state.products.products);
    const selectAll = ({ target }: { target: HTMLInputElement }) => {
      if (target.checked) {
        checkedProducts.value = [...products.value];
      } else {
        checkedProducts.value = [];
      }
    };
    const itemChecked = (id: number) => {
      return checkedProducts.value.some((el) => el.id === id);
    };
    const addItem = (
      { target }: { target: HTMLInputElement },
      product: Product
    ) => {
      if (target.checked) {
        checkedProducts.value.push(product);
      } else {
        checkedProducts.value = checkedProducts.value.filter(
          (item) => item.id !== product.id
        );
      }
    };
    onBeforeMount(async () => {
      await store.dispatch(ActionType.GET_PRODUCTS);
    });
    return {
      store,
      products,
      checkedProducts,
      selectAll,
      checkAll,
      RouteNames,
      addItem,
      itemChecked,
    };
  },
});
</script>

<style lang="scss" scoped>
.products {
  &__checkbox-wrapper {
    padding: 10px 10px;
    display: flex;
    align-items: center;
    & input {
      margin-right: 10px;
    }
  }
  &__list {
    list-style-type: none;
    &-item {
      display: flex;
      height: 50px;
      background: white;
      margin-bottom: 10px;
      align-items: center;
      padding: 0px 10px;
      justify-content: space-between;
      &--content-wrapper {
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
      &--link {
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
  }
}
</style>
