<template>
  <div class="category-products">
    <teleport to="#app">
      <modal
        v-if="showModal"
        @close="toggleShowModal(false)">
        <template #title>
          {{ $t("Products") }}
        </template>
        <products-list
          :current-category="currentCategory"
          @toggleShowModal="toggleShowModal" />
        <template #footer>
          <div />
        </template>
      </modal>
    </teleport>
    <div class="category-products__buttons">
      <button
        class="category-products__add-product-button"
        @click="toggleShowModal(true)">
        {{ $t("AddProducts") }}
      </button>
      <button
        class="category-products__delete-all-button"
        @click="deleteAllProducts">
        {{ $t("DeleteAll") }}
      </button>
    </div>
    <loader-component v-if="loader" />
    <div
      v-else-if="categoryProducts.length === 0"
      class="category-products__no-products">
      <span>{{
        `${$t("NoProductsInCategory")} "${currentCategory.title}"`
      }}</span>
    </div>
    <table v-else>
      <tr class="category-products__table-header">
        <th>{{ $t("SKU") }}</th>
        <th>{{ $t("Title") }}</th>
        <th />
      </tr>
      <tr
        v-for="product in categoryProducts"
        :key="product.id"
        class="category-products__table-row">
        <td class="category-products__table-sku">
          {{ product.sku }}
        </td>
        <td class="category-products__table-title">
          {{ product.title }}
        </td>
        <td class="category-products__table-delete">
          <button
            class="category-products__delete-button"
            @click="deleteProductFromCategory(product.id)">
            <svg-icon name="delete" />
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { useRoute } from "vue-router";
import { ActionType } from "@/store/modules/Categories/ActionType";
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { Category } from "@/types/Category";
import Modal from "@/components/Modal.vue";
import ProductsList from "./components/ProductsList.vue";

export default defineComponent({
  name: "CategoryProducts",
  components: {
    Modal,
    ProductsList,
    LoaderComponent,
  },
  props: {
    currentCategory: {
      type: Object as () => Category,
      default: () => ({}),
    },
  },
  setup() {
    const loader = ref(true);
    const route = useRoute();
    const store = useStore();
    const showModal = ref(false);
    const toggleShowModal = (value: boolean) => {
      showModal.value = value;
    };
    const categoryProducts = computed(
      () => store.state.categories.categoryProducts
    );
    const deleteProductFromCategory = async (productId: number) => {
      const data = {
        categoryId: +route.params.id,
        productId,
      };
      await store.dispatch(ActionType.DELETE_PRODUCT_FROM_CATEGORY, data);
      await store.dispatch(ActionType.GET_CATEGORY_PRODUCTS, +route.params.id);
    };
    const deleteAllProducts = async () => {
      await store.dispatch(
        ActionType.DELETE_ALL_PRODUCTS_FROM_CATEGORY,
        +route.params.id
      );
      await store.dispatch(ActionType.GET_CATEGORY_PRODUCTS, +route.params.id);
    };
    onBeforeMount(async () => {
      await store.dispatch(ActionType.GET_CATEGORY_PRODUCTS, +route.params.id);
      loader.value = false;
    });
    return {
      categoryProducts,
      deleteProductFromCategory,
      deleteAllProducts,
      toggleShowModal,
      showModal,
      loader,
    };
  },
});
</script>

<style lang="scss">
.category-products {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  &__buttons {
    display: flex;
    margin-top: 20px;
    padding: 0px 20px;
  }
  &__add-product-button,
  &__delete-all-button {
    min-width: 120px;
    height: 30px;
    padding: 0px 8px;
    border-radius: 5px;
    background: rgba(25, 165, 39, 0.8);
    color: white;
    outline: none;
    margin-right: 10px;
  }
  &__delete-all-button {
    background: red;
  }
  & table {
    width: 100%;
    border-spacing: 0 10px;
    margin-top: 25px;
    margin-bottom: 25px;
  }
  &__table-row {
    background: whitesmoke;
    height: 50px;
  }
  &__table-sku,
  &__table-title {
    text-align: center;
  }
  &__table-delete {
    text-align: right;
    padding-right: 10px;
  }
  &__delete-button {
    height: 30px;
    padding: 0px 8px;
    border-radius: 5px;
    background: red;
    outline: none;
    color: white;
    & svg {
      width: 24px;
      vertical-align: middle;
      height: 19px;
    }
  }
  &__no-products {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    & span {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
