<template>
  <div class="create-category">
    <form
      class="create-category__form"
      @submit.prevent="submit">
      <div class="create-category__fields">
        <div class="create-category__field">
          <label class="create-category__label">
            {{ $t("Title") }}
            <input
              v-model="newCategory.title"
              required
              class="create-category__input"
              type="text">
          </label>
        </div>
        <div class="create-category__field">
          <label class="create-category__label">
            {{ $t("Description") }}
            <textarea
              v-model="newCategory.desc"
              class="create-category__textarea" />
          </label>
        </div>
      </div>
      <button class="create-category__button">
        {{ $t("Create") }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { NewCategory } from "@/types/Category";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import { defineComponent, ref } from "vue";
import { ActionType } from "@/store/modules/Categories/ActionType";
import { RouteNames } from "@/router/RouteNames";

export default defineComponent({
  name: "CreateCategory",

  setup() {
    const newCategory: { value: NewCategory } = ref({});
    const store = useStore();
    const router = useRouter();
    const submit = async () => {
      const category: NewCategory = {
        title: newCategory.value.title,
        desc: newCategory.value.desc,
      };
      const res = await store.dispatch(ActionType.CREATE_CATEGORY, category);
      await store.dispatch(ActionType.GET_CATEGORIES);
      router.push({ name: RouteNames.CATEGORY, params: { id: res.id } });
    };
    return { newCategory, submit };
  },
});
</script>

<style lang="scss">
.create-category {
  padding: 15px 20px;
  height: 100%;
  display: flex;
  &__form {
    flex-grow: 1;
  }
  &__fields {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 -10px;
    flex-direction: column;
  }
  &__field {
    display: flex;
    flex-direction: column;
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
  &__input {
    width: 50%;
  }
  &__textarea {
    min-height: 200px;
    padding: 10px 10px;
    resize: none;
    width: 100%;
  }
  &__button {
    min-width: 120px;
    height: 30px;
    padding: 0px 8px;
    border-radius: 5px;
    background: var(--select-navigation-color);
    color: white;
    outline: none;
  }
}
</style>
