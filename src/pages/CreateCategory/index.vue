<template>
  <div class="create-category">
    <div
      v-if="currentRouteName !== RouteNames.CREATE_CATEGORY"
      class="create-category__header">
      <button
        class="create-category__create-subcategory"
        :disabled="currentRouteName === RouteNames.ADD_SUB_CATEGORY"
        @click="addSubCategory">
        {{ $t("AddSubcategory") }}
      </button>
      <button
        :disabled="currentRouteName === RouteNames.ADD_SUB_CATEGORY"
        class="create-category__delete-category"
        @click="deleteCategory">
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
              v-model="currentCategory.title"
              required
              class="create-category__input"
              type="text">
          </label>
        </div>
        <div class="create-category__field">
          <label class="create-category__label">
            {{ $t("Description") }}
            <textarea
              v-model="currentCategory.desc"
              class="create-category__textarea" />
          </label>
        </div>
      </div>
      <button class="create-category__button">
        {{
          currentRouteName === RouteNames.EDIT_CATEGORY
            ? $t("Save")
            : currentRouteName === RouteNames.ADD_SUB_CATEGORY
              ? $t("Add")
              : $t("Create")
        }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
// import { useStore } from "@/store";
// import { Category, NewCategory } from "@/types/Category";
import { useRouter, useRoute } from "vue-router";
import { computed, defineComponent, onBeforeMount, ref, watch } from "vue";
import { useStore } from "@/store";
import { RouteNames } from "@/router/RouteNames";
import { Category } from "@/types/Category";

export default defineComponent({
  name: "CreateCategory",
  //   props: {
  //     currentCategory: {
  //       type: Object as () => Category,
  //       default: () => ({}),
  //     },
  //     currentMode: {
  //       type: String,
  //       default: "",
  //     },
  //   },
  //   emits: ["openEditForm"],
  setup() {
    const route = useRoute();
    const router = useRouter();
    const currentRouteName = computed(() => route.name);
    const store = useStore();
    const currentCategory = ref({});
    const categories = computed(() => store.state.categories.categories);
    const findById = (
      obj: any,
      id: number
    ): Category[] | Category | undefined => {
      let result;
      for (const item in obj) {
        if (obj.id === id) {
          return obj;
        } else {
          if (typeof obj[item] === "object") {
            result = findById(obj[item], id);
            if (result) {
              return result;
            }
          }
        }
      }
      return result;
    };
    onBeforeMount(() => {
      currentCategory.value = {
        ...findById(categories.value, Number(route.params.id)),
      };
    });

    watch(
      () => route.params.id,
      (newId) => {
        currentCategory.value = {
          ...findById(categories.value, Number(newId)),
        };
      }
    );

    const addSubCategory = () => {
      router.push({
        name: RouteNames.ADD_SUB_CATEGORY,
        params: { id: route.params.id },
      });
    };

    // const deleteCategory = async () => {
    //   const permission = confirm(
    //     `Вы действительно хотите удалить категорию ${currentCategory.value.title}?`
    //   );
    //   if (permission) {
    //     await store.dispatch(
    //       ActionType.DELETE_CATEGORY,
    //       currentCategory.value.id
    //     );
    //     router.push({ name: RouteNames.CREATE_CATEGORY });
    //     await store.dispatch(ActionType.GET_CATEGORIES);
    //   } else {
    //     return false;
    //   }
    // };
    // const store = useStore();
    // const currentCategoryValue: { value: Category | NewCategory } = ref({
    //   ...props.currentCategory,
    // });
    // watch(
    //   () => props.currentCategory,
    //   (newVal) => {
    //     if (props.currentMode === "addSubCategory") {
    //       currentCategoryValue.value = {};
    //     } else {
    //       currentCategoryValue.value = { ...newVal };
    //     }
    //   }
    // );
    // const deleteCategory = async () => {
    //   const permission = confirm(
    //     `Вы действительно хотите удалить категорию ${props.currentCategory.title}?`
    //   );
    //   if (permission) {
    //     await store.dispatch(
    //       ActionType.DELETE_CATEGORY,
    //       props.currentCategory.id
    //     );
    //     emit("openEditForm", "new", {});
    //     await store.dispatch(ActionType.GET_CATEGORIES);
    //   } else {
    //     return false;
    //   }
    // };
    // const submit = async () => {
    //   let res: Category;
    //   const category: Category | NewCategory = {
    //     title: currentCategoryValue.value.title,
    //     desc: currentCategoryValue.value.desc,
    //   };
    //   if (props.currentMode === "edit") {
    //     category.id = props.currentCategory.id;
    //     res = await store.dispatch(ActionType.EDIT_CATEGORY, category);
    //   } else {
    //     category.parent = props.currentCategory.id;
    //     res = await store.dispatch(ActionType.CREATE_CATEGORY, category);
    //   }
    //   emit("openEditForm", "edit", res);
    //   await store.dispatch(ActionType.GET_CATEGORIES);
    // };
    // const addSubCategory = () => {
    //   emit("openEditForm", "addSubCategory", props.currentCategory);
    // };
    // return { submit, currentCategoryValue, deleteCategory, addSubCategory };
    return {
      currentRouteName,
      currentCategory,
      route,
      RouteNames,
      addSubCategory,
    };
  },
});
</script>

<style lang="scss" scoped>
.create-category {
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
