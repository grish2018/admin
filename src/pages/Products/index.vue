<template>
  <div class="products">
    <div class="products__checkbox-wrapper">
      <input
        id="selectAll"
        v-model="checkAll"
        type="checkbox"
        @change="selectAll">
      <label for="selectAll">
        Select all products
      </label>
    </div>
    <ul class="products__list">
      <li
        v-for="item in products"
        :key="item.id"
        class="products__list-item">
        <div class="products__list-item__content-wrapper">
          <input
            v-model="checkedProducts"
            :value="item"
            type="checkbox"
            :checked="checkAll"
            class="products__list-item__content-wrapper__input">
          <img
            v-if="item.img"
            src=""
            alt="">
          <div
            v-else
            class="products__list-item__content-wrapper__image">
            {{ item.title[0] }}
          </div>
          <div class="products__list-item__content-wrapper__description">
            <span><b>Name:</b> {{ item.title }}</span>
            <span><b>Price:</b> {{ item.price }}</span>
          </div>
        </div>
        <button
          class="products__list-item__button"
          @click="toProduct(item.id)">
          View product
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ActionType } from "@/store/modules/Products/ActionType";
import { useStore } from "@/store";
import { defineComponent, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "ProductsPage",
  setup() {
    const checkedProducts = ref([]);
    const store = useStore();
    const router = useRouter();
    const checkAll = ref(false);
    const products = store.state.products.products;
    const selectAll = () => {
      if (checkAll.value) {
        checkedProducts.value = [...products];
      } else {
        checkedProducts.value = [];
      }
    };
    const toProduct = (id: string) => {
      router.push({ path: `/product/${id}` });
    };
    onBeforeMount(async () => {
      await store.dispatch(ActionType.GET_PRODUCTS);
    });
    return { store, products, checkedProducts, selectAll, checkAll, toProduct };
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
      &__content-wrapper {
        display: flex;
        align-items: center;
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
      }
      &__button {
        height: 30px;
        width: 100px;
        border-radius: 5px;
        background: rgba(25, 165, 39, 0.8);
        color: white;
      }
    }
  }
}
</style>
