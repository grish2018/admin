<template>
  <div class="products">
    <div class="products__header">
      <div class="products__checkbox">
        <input
          id="selectAll"
          :checked="allSelected"
          type="checkbox"
          @change="selectAll">
        <label for="selectAll">
          Выбрать все продукты
        </label>
      </div>
      <router-link
        :to="{ name: RouteNames.CREATE_PRODUCTS, params: { mode: 'new' } }"
        class="products__create-link">
        Создать продукт
      </router-link>
    </div>
    <ul class="products__list">
      <li
        v-for="item in products"
        :key="item.id"
        class="products__list-item">
        <product-card
          :checked="itemChecked(item.id)"
          :product="item"
          @selectItem="addItem" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import ProductCard from "./Components/ProductCard.vue";
import { ActionType } from "@/store/modules/Products/ActionType";
import { useStore } from "@/store";
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { Product } from "@/types/Product";
import { RouteNames } from "@/router/RouteNames";
export default defineComponent({
  name: "ProductsPage",
  components: { ProductCard },
  setup() {
    const checkedProducts: { value: { id: number }[] } = ref([]);
    const store = useStore();
    const products = computed(() => store.state.products.products);
    const showCreateProductForm = ref(false);
    const allSelected = computed(() => {
      if (products.value.length !== 0) {
        return false;
      } else {
        return products.value.length === checkedProducts.value.length;
      }
    });
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
    onBeforeMount(() => {
      store.dispatch(ActionType.GET_PRODUCTS);
    });
    return {
      store,
      products,
      checkedProducts,
      selectAll,
      addItem,
      itemChecked,
      allSelected,
      RouteNames,
      showCreateProductForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.products {
  width: 100%;
  &__header {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
  }
  &__checkbox {
    padding: 10px 10px;
    display: flex;
    align-items: center;
    & input {
      margin-right: 10px;
    }
  }
  &__create-link {
    height: 30px;
    padding: 0px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    text-decoration: none;
    background: var(--select-navigation-color);
    color: white;
  }
  &__list {
    list-style-type: none;
  }
}
</style>
