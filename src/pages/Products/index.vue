<template>
  <div class="products">
    <div class="products__checkbox-wrapper">
      <input
        id="selectAll"
        :checked="allSelected"
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
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { Product } from "@/types/Product";
export default defineComponent({
  name: "ProductsPage",
  components: { ProductCard },
  setup() {
    const checkedProducts: { value: { id: number }[] } = ref([]);
    const store = useStore();
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
      addItem,
      itemChecked,
      allSelected,
    };
  },
});
</script>

<style lang="scss" scoped>
.products {
  width: 100%;
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
  }
}
</style>
