<template>
  <div class="create-product-form">
    <router-link
      :to="{ name: RouteNames.PRODUCTS }"
      class="create-product-form__close-link">
      Список продуктов
    </router-link>
    <form
      class="create-product-form__form"
      @submit.prevent="submit">
      <div class="create-product-form__form--inputs">
        <div class="create-product-form__form--input">
          <label for="title">
            Название
          </label>
          <input
            id="title"
            v-model="title"
            type="text">
        </div>
        <div class="create-product-form__form--input">
          <label for="weigth">
            Цена
          </label>
          <input
            id="weigth"
            v-model="price"
            type="number">
        </div>
        <div class="create-product-form__form--input">
          <label for="article">
            Артикул
          </label>
          <input
            id="article"
            v-model="sku"
            type="text">
        </div>
        <div class="create-product-form__form--input">
          <label for="weigth">
            Вес, кг
          </label>
          <input
            id="weigth"
            v-model="weigth"
            type="number">
        </div>
      </div>
      <div class="create-product-form__form--textarea">
        <label for="description">
          Oписание
        </label>
        <textarea
          id="description"
          v-model="desc" />
      </div>
      <button class="create-product-form__form--button">
        {{ route.params.mode === "new" ? "Cоздать" : "Сохранить" }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";
import { ActionType } from "@/store/modules/Products/ActionType";
import { computed, defineComponent, onMounted, ref } from "vue";
import { RouteNames } from "@/router/RouteNames";
export default defineComponent({
  name: "CreateProductForm",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    onMounted(() => {
      if (route.query.id) {
        store.dispatch(ActionType.GET_PRODUCT_BY_ID, Number(route.query.id));
      }
    });
    const currentProduct = computed(() => store.state.products.currentProduct);
    const title = ref(currentProduct.value?.title);
    const sku = ref(currentProduct.value?.sku);
    const price = ref(currentProduct.value?.price);
    const weigth = ref(currentProduct.value?.weight);
    const desc = ref(currentProduct.value?.desc);
    const submit = async () => {
      const newProduct = {
        product: {
          title: title.value,
          sku: sku.value,
          price: price.value,
          desc: desc.value,
          weight: weigth.value,
        },
      };
      if (route.params.mode === "new") {
        await store.dispatch(ActionType.CREATE_PRODUCT, newProduct);
      } else {
        await store.dispatch(ActionType.EDIT_PRODUCT, newProduct);
      }
      router.push({ name: RouteNames.PRODUCTS });
    };
    return { title, sku, price, weigth, desc, submit, route, RouteNames };
  },
});
</script>

<style lang="scss" scoped>
.create-product-form {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px 20px;
  flex-direction: column;
  &__close-link {
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
    &--inputs {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    &--input {
      width: 30%;
      display: flex;
      flex-direction: column;
      width: 49%;
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      & input[type="number"] {
        -moz-appearance: textfield;
      }
      & input[type="number"]::-webkit-outer-spin-button,
      & input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      & input {
        width: 100%;
        padding: 0px 10px;
        border: 2px solid #dfe3e7;
        border-radius: 7px;
        height: 40px;
        outline: none;
        transition: all 0.3s;
        &:focus {
          border: 2px solid var(--select-navigation-color);
        }
      }
      & label {
        color: #3f4d5a;
        font-size: 19px;
        font-weight: bolder;
        margin-bottom: 8px;
      }
    }
    &--textarea {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      & textarea {
        height: 100%;
        padding: 10px 10px;
        border: 2px solid #dfe3e7;
        border-radius: 7px;
        outline: none;
        resize: none;
        transition: all 0.3s;
        margin-bottom: 15px;
        &:focus {
          border: 2px solid var(--select-navigation-color);
        }
      }
      & label {
        color: #3f4d5a;
        font-size: 19px;
        font-weight: bolder;
        margin-bottom: 8px;
      }
    }
    &--button {
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
}
</style>
