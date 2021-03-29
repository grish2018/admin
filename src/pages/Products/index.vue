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
          Select all products
        </label>
      </div>
      <button
        class="products__create-button"
        @click="craeteProduct">
        Create product
      </button>
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
import ProductCard from "@/components/ProductCard.vue";
import { ActionType } from "@/store/modules/Products/ActionType";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { Product } from "@/types/Product";
import { RouteNames } from "@/router/RouteNames";
export default defineComponent({
  name: "ProductsPage",
  components: { ProductCard },
  setup() {
    const checkedProducts: { value: { id: number }[] } = ref([]);
    const store = useStore();
    const router = useRouter();
    const products = computed(() => store.state.products.products);
    const allSelected = computed(
      () => products.value.length === checkedProducts.value.length
    );
    const selectAll = ({ target }: { target: HTMLInputElement }) => {
      if (target.checked) {
        checkedProducts.value = [...products.value];
      } else {
        checkedProducts.value = [];
      }
    };
    const craeteProduct = () => {
      const newProduct = {
        id: products.value[products.value.length - 1].id + 1,
        title: "",
      };
      store.dispatch(ActionType.CREATE_PRODUCT, newProduct);
      router.push({ name: RouteNames.PRODUCT, params: { id: newProduct.id } });
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
      craeteProduct,
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
  &__create-button {
    height: 30px;
    width: 120px;
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
