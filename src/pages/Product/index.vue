<template>
  <div class="product">
    <div class="product__header">
      <span>Title</span>
    </div>
    <div class="product__images" />
    <form
      class="product__form"
      @submit.prevent="submit">
      <div class="product__form--inputs">
        <div class="product__form--input">
          <label for="title">
            Название
          </label>
          <input
            id="title"
            v-model="title"
            type="text">
        </div>
        <div class="product__form--input">
          <label for="article">
            Артикул
          </label>
          <input
            id="article"
            v-model="article"
            type="text">
        </div>
        <div class="product__form--input">
          <label for="weigth">
            Вес, кг
          </label>
          <input
            id="weigth"
            v-model="weigth"
            type="number">
        </div>
      </div>
      <div class="product__form--checkbox">
        <input
          id="delivery"
          v-model="delivery"
          type="checkbox">
        <label for="delivery">
          Товар требует доставки или самовывоза
        </label>
        <div class="product__more-info">
          <span>?</span>
          <div class="product__more-info--content">
            <span>Some info</span>
          </div>
        </div>
      </div>
      <div class="product__form--textarea">
        <label for="description">
          Oписание
        </label>
        <textarea
          id="description"
          v-model="description" />
      </div>
      <button class="product__form--button">
        Cохранить
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "ProductPage",
  setup() {
    const title = ref("");
    const article = ref("");
    const weigth = ref("");
    const delivery = ref(false);
    const description = ref("");
    const route = useRouter();
    const submit = () => {
      const product = {
        title: title.value,
        article: article.value,
        weigth: weigth.value,
        delivery: delivery.value,
        description: description.value,
      };
      // eslint-disable-next-line
      console.log(product);
    };
    return { route, title, article, weigth, delivery, description, submit };
  },
});
</script>

<style lang="scss" scoped>
.product {
  height: 100%;
  display: flex;
  padding: 20px 20px;
  flex-direction: column;
  &__header {
    height: 110px;
    & span {
      color: #3f4d5a;
      font-size: 45px;
      font-weight: bold;
    }
  }
  &__images {
    height: 135px;
    background: white;
    border-radius: 10px;
    margin-bottom: 15px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
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
      justify-content: space-between;
    }
    &--input {
      width: 30%;
      display: flex;
      flex-direction: column;
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
    &--checkbox {
      display: flex;
      align-items: center;
      margin: 15px 0px;
      & input {
        margin-right: 6px;
      }
      & label {
        color: #3f4d5a;
        font-size: 15px;
        font-weight: bolder;
        margin-right: 6px;
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
  &__more-info {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    position: relative;
    border: 2px solid var(--select-navigation-color);
    &:hover {
      .product__more-info--content {
        display: flex;
      }
    }
    & span {
      font-size: 10px;
      font-weight: 800;
      color: var(--select-navigation-color);
    }
    &--content {
      position: absolute;
      width: max-content;
      padding: 4px 6px;
      left: 13px;
      bottom: 4px;
      background: var(--select-navigation-color);
      display: none;
      & span {
        color: white;
      }
    }
  }
}
</style>
