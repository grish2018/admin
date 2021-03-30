<template>
  <div class="create-product">
    <router-link
      :to="{ name: RouteNames.PRODUCTS }"
      class="create-product__link">
      Список продуктов
    </router-link>
    <form
      class="create-product__form"
      @submit.prevent="submit">
      <div class="create-product__fields">
        <div class="create-product__field">
          <label class="create-product__label">
            Название
            <input
              v-model="currentProduct.title"
              class="create-product__input"
              type="text">
          </label>
        </div>
        <div class="create-product__field">
          <label class="create-product__label">
            Цена
            <input
              v-model="currentProduct.price"
              class="create-product__input"
              type="number">
          </label>
        </div>
        <div class="create-product__field">
          <label class="create-product__label">
            Артикул
            <input
              v-model="currentProduct.sku"
              class="create-product__input"
              type="text">
          </label>
        </div>
        <div class="create-product__field">
          <label class="create-product__label">
            Вес, кг
            <input
              v-model="currentProduct.weight"
              class="create-product__input"
              type="number">
          </label>
        </div>
        <div class="create-product__field">
          <label class="create-product__label">
            Oписание
            <textarea
              v-model="currentProduct.desc"
              class="create-product__textarea" />
          </label>
        </div>
      </div>
      <button class="create-product__button">
        {{
          route.name === RouteNames.CREATE_PRODUCTS ? "Cоздать" : "Сохранить"
        }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";
import { NewProduct, Product } from "@/types/Product";
import { ActionType } from "@/store/modules/Products/ActionType";
import { defineComponent, onMounted, ref } from "vue";
import { RouteNames } from "@/router/RouteNames";
export default defineComponent({
  name: "CreateProductForm",
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const currentProduct: { value: NewProduct | Product } = ref({});
    const id = route.params.id ? +route.params.id : undefined;
    onMounted(async () => {
      if (id !== undefined) {
        await store.dispatch(ActionType.GET_PRODUCT_BY_ID, id);
        if (store.state.products.currentProduct) {
          currentProduct.value = { ...store.state.products.currentProduct };
        }
      }
    });
    const submit = async () => {
      if (route.name === RouteNames.CREATE_PRODUCTS) {
        await store.dispatch(ActionType.CREATE_PRODUCT, currentProduct.value);
      } else if (id !== undefined) {
        await store.dispatch(ActionType.EDIT_PRODUCT, {
          ...currentProduct.value,
          id,
        });
      }
      router.push({ name: RouteNames.PRODUCTS });
    };
    return { submit, route, RouteNames, currentProduct };
  },
});
</script>

<style lang="scss" scoped>
.create-product {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px 20px;
  flex-direction: column;
  &__link {
    height: 30px;
    width: fit-content;
    padding: 0px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    text-decoration: none;
    background: rgba(25, 165, 39, 0.8);
    color: white;
    margin-bottom: 15px;
  }
  &__form {
    flex-grow: 1;
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
  &__fields {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 -10px;
  }
  &__field {
    display: flex;
    flex-direction: column;
    width: calc(50% - 20px);
    margin: 0 10px 10px;
    flex-grow: 1;
  }
  &__label {
    display: flex;
    flex-direction: column;
    color: #3f4d5a;
    font-size: 19px;
    font-weight: bolder;
    margin-bottom: 8px;
  }
  &__input,
  &__textarea {
    width: 100%;
    padding: 0px 10px;
    border: 2px solid #dfe3e7;
    border-radius: 7px;
    height: 40px;
    outline: none;
    transition: all 0.3s;
    &[type="number"]::-webkit-outer-spin-button,
    &[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type="number"] {
      -moz-appearance: textfield;
    }
    &:focus {
      border: 2px solid var(--select-navigation-color);
    }
  }
  &__textarea {
    min-height: 200px;
    padding: 10px 10px;
    resize: none;
  }
  &__button {
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
}
</style>
