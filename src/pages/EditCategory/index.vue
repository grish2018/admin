<template>
  <div class="edit-category">
    <div class="edit-category__header">
      <button
        class="edit-category__create-subcategory"
        :disabled="isRouteAddSubCategory"
        @click="addSubCategory">
        {{ $t("AddSubcategory") }}
      </button>
      <button
        :disabled="isRouteAddSubCategory"
        class="edit-category__delete-category"
        @click="deleteCategory">
        {{ $t("Delete") }}
      </button>
    </div>
    <form
      class="edit-category__form"
      @submit.prevent="submit">
      <div class="edit-category__fields">
        <div class="edit-category__field">
          <label class="edit-category__label">
            {{ $t("Title") }}
            <input
              v-model="currentCategoryValue.title"
              required
              class="edit-category__input"
              type="text">
          </label>
        </div>
        <div class="edit-category__field">
          <label class="edit-category__label">
            {{ $t("Description") }}
            <textarea
              v-model="currentCategoryValue.desc"
              class="edit-category__textarea" />
          </label>
        </div>
      </div>
      <button class="edit-category__button">
        {{
          currentRouteName === RouteNames.EDIT_CATEGORY ? $t("Save") : $t("Add")
        }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { ActionType } from "@/store/modules/Categories/ActionType";
import { useRouter, useRoute } from "vue-router";
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "@/store";
import { RouteNames } from "@/router/RouteNames";
import { Category, NewCategory } from "@/types/Category";

export default defineComponent({
  name: "EditCategory",
  props: {
    currentCategory: {
      type: Object as () => Category,
      default: () => ({}),
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const isRouteAddSubCategory = computed(
      () => route.name === RouteNames.ADD_SUB_CATEGORY
    );
    const currentRouteName = computed(() => route.name);
    const store = useStore();
    const currentCategoryValue: { value: Category | NewCategory } = ref({
      ...props.currentCategory,
    });
    watch(
      () => props.currentCategory,
      (newVal) => {
        currentCategoryValue.value = { ...newVal };
      }
    );
    const addSubCategory = () => {
      currentCategoryValue.value = {};
      router.push({
        name: RouteNames.ADD_SUB_CATEGORY,
        params: { id: route.params.id },
      });
    };

    const deleteCategory = async () => {
      const permission = confirm(
        `Вы действительно хотите удалить категорию ${currentCategoryValue.value?.title}?`
      );
      if (permission) {
        await store.dispatch(ActionType.DELETE_CATEGORY, +route.params.id);
        router.push({ name: RouteNames.CREATE_CATEGORY });
        await store.dispatch(ActionType.GET_CATEGORIES);
      } else {
        return false;
      }
    };

    const submit = async () => {
      let res: Category;
      const category: Category | NewCategory = {
        title: currentCategoryValue.value?.title,
        desc: currentCategoryValue.value?.desc,
      };
      if (currentRouteName.value === RouteNames.EDIT_CATEGORY) {
        category.id = +route.params.id;
        res = await store.dispatch(ActionType.EDIT_CATEGORY, category);
      } else {
        category.parent = +route.params.id;
        res = await store.dispatch(ActionType.CREATE_CATEGORY, category);
      }
      await store.dispatch(ActionType.GET_CATEGORIES);
      router.push({ name: RouteNames.CATEGORY, params: { id: res.id } });
    };
    return {
      currentRouteName,
      currentCategoryValue,
      route,
      RouteNames,
      addSubCategory,
      deleteCategory,
      submit,
      isRouteAddSubCategory,
    };
  },
});
</script>

<style lang="scss">
.edit-category {
  display: flex;
  width: 100%;
  height: 80%;
  flex-direction: column;
  padding: 15px 20px;
  &__header {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
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
    &:disabled {
      opacity: 0.7;
    }
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
