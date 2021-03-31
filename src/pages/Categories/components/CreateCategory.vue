<template>
  <div class="create-category">
    <div
      v-if="currentMode === 'edit'"
      class="create-category__header">
      <span class="create-category__title">
        {{ currentCategory.title }}
      </span>
      <button class="create-category__create-subcategory">
        {{ $t("AddSubcategory") }}
      </button>
      <button class="create-category__delete-category">
        {{ $t("Delete") }}
      </button>
    </div>
    <form
      class="create-category__form"
      @submit.prevent="submit">
      <div class="create-category__fields">
        <div class="create-category__field">
          <label class="create-category__label">
            {{ $t("Title") }}
            <input
              v-model="currentCategoryValue.title"
              required
              class="create-category__input"
              type="text">
          </label>
        </div>
        <div class="create-category__field">
          <label class="create-category__label">
            {{ $t("Description") }}
            <textarea
              v-model="currentCategoryValue.desc"
              class="create-category__textarea" />
          </label>
        </div>
      </div>
      <button class="create-category__button">
        {{ currentMode === "edit" ? $t("Save") : $t("Create") }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { ActionType } from "@/store/modules/Categories/ActionType";
import { Category, NewCategory } from "@/types/Category";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "CreateCategory",
  props: {
    currentCategory: {
      type: Object as () => Category,
      default: {},
    },
    currentMode: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const currentCategoryValue: { value: Category | NewCategory } = ref({
      ...props.currentCategory,
    });
    const store = useStore();
    const submit = async () => {
      await store.dispatch(
        ActionType.CREATE_CATEGORY,
        currentCategoryValue.value
      );
      await store.dispatch(ActionType.GET_CATEGORIES);
      currentCategoryValue.value = {};
    };
    return { submit, currentCategoryValue };
  },
});
</script>

<style lang="scss" scoped>
.create-category {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  &__header {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
    & span {
      width: 100%;
      width: 100%;
      font-size: 30px;
      font-weight: bold;
    }
  }
  &__title {
    margin-bottom: 5px;
  }
  &__create-subcategory,
  &__delete-category,
  &__button {
    min-width: 120px;
    height: 30px;
    padding: 0px 8px;
    border-radius: 5px;
    background: var(--select-navigation-color);
    color: white;
    outline: none;
  }

  &__delete-category {
    background: red;
  }
  &__create-subcategory {
    margin-right: 20px;
    background: rgba(25, 165, 39, 0.8);
  }
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
}
</style>
