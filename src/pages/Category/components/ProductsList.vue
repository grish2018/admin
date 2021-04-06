<template>
  <div
    v-if="products.length !== 0"
    class="products-list">
    <table>
      <tr class="products-list__table-header">
        <th>
          <input
            id="selectAll"
            :checked="allSelected"
            type="checkbox"
            @change="selectAll">
        </th>
        <th>{{ $t("SKU") }}</th>
        <th>{{ $t("Title") }}</th>
        <th />
      </tr>
      <tr>
        <th>{{ $t("Filter") }}</th>
        <th><input type="text"></th>
        <th><input type="text"></th>
      </tr>
      <tr
        v-for="product in products"
        :key="product.id"
        class="products-list__table-row">
        <td class="products-list__table-check">
          <input
            type="checkbox"
            :checked="itemChecked(product.id)"
            @change="addItem($event, product.id)">
        </td>
        <td class="products-list__table-sku">
          {{ product.sku }}
        </td>
        <td class="products-list__table-title">
          {{ product.title }}
        </td>
        <td class="products-list__table-delete">
          <button
            class="products-list__add-product-button"
            @click="addProduct(product.id)">
            +
          </button>
        </td>
      </tr>
    </table>
    <div>
      <button
        class="products-list__add-selected-button"
        @click="addProducts">
        {{ $t("AddProducts") }}
      </button>
      <button
        class="products-list__close-modal-button"
        @click="$emit('toggleShowModal', false)">
        {{ $t("Cancel") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { ActionType as productsActions } from "@/store/modules/Products/ActionType";
import { ActionType as categoryActions } from "@/store/modules/Categories/ActionType";
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { Category } from "@/types/Category";
export default defineComponent({
  name: "ProductsList",
  props: {
    currentCategory: {
      type: Object as () => Category,
      default: () => ({}),
    },
  },
  emits: ["toggleShowModal"],
  setup(props, { emit }) {
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch(productsActions.GET_PRODUCTS);
    });

    const products = computed(() => store.state.products.products);

    const checkedProducts: { value: number[] } = ref([]);

    const allSelected = computed(() => {
      if (products.value.length === 0) {
        return false;
      } else {
        return products.value.length === checkedProducts.value.length;
      }
    });

    const selectAll = ({ target }: { target: HTMLInputElement }) => {
      if (target.checked) {
        const allProducts = [];
        for (const product of products.value) {
          allProducts.push(product.id);
          checkedProducts.value = [...allProducts];
        }
      } else {
        checkedProducts.value = [];
      }
    };

    const addItem = ({ target }: { target: HTMLInputElement }, id: number) => {
      if (target.checked) {
        checkedProducts.value.push(id);
      } else {
        checkedProducts.value = checkedProducts.value.filter(
          (item) => item !== id
        );
      }
    };

    const itemChecked = (id: number) => {
      return checkedProducts.value.some((el) => el === id);
    };

    const addProduct = async (id: number) => {
      const data = {
        categoryId: props.currentCategory.id,
        products: [id],
      };
      await store.dispatch(categoryActions.ADD_PRODUCTS_TO_CATEGORY, data);
      await store.dispatch(
        categoryActions.GET_CATEGORY_PRODUCTS,
        props.currentCategory.id
      );
      emit("toggleShowModal", false);
    };

    const addProducts = async () => {
      const data = {
        categoryId: props.currentCategory.id,
        products: [...checkedProducts.value],
      };
      await store.dispatch(categoryActions.ADD_PRODUCTS_TO_CATEGORY, data);
      await store.dispatch(
        categoryActions.GET_CATEGORY_PRODUCTS,
        props.currentCategory.id
      );
      emit("toggleShowModal", false);
    };

    return {
      products,
      addItem,
      allSelected,
      selectAll,
      itemChecked,
      addProducts,
      addProduct,
    };
  },
});
</script>

<style lang="scss" scoped>
.products-list {
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 500px;
  background: whitesmoke;
  & table {
    width: 100%;
    border-spacing: 0 10px;
    margin-bottom: 7px;
  }
  &__table-row {
    background: white;
    height: 50px;
  }
  &__table-check {
    padding-left: 10px;
  }
  &__table-sku,
  &__table-title {
    text-align: center;
  }
  &__table-delete {
    text-align: right;
    padding-right: 10px;
  }
  &__add-product-button {
    height: 30px;
    width: 30px;
    font-size: 20px;
    padding: 0px 8px;
    border-radius: 5px;
    background: var(--select-navigation-color);
    outline: none;
    color: white;
  }
  &__add-selected-button,
  &__close-modal-button {
    width: fit-content;
    height: 30px;
    padding: 8px 10px;
    border-radius: 5px;
    background: var(--select-navigation-color);
    outline: none;
    color: white;
    margin-left: 10px;
    margin-bottom: 20px;
  }
  &__close-modal-button {
    background: red;
  }
}
</style>
