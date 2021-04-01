<template>
  <div class="categories">
    <span class="categories__header">
      {{ $t("Categories") }}
    </span>

    <div class="categories__content">
      <div class="categories__list">
        <button
          class="categories__create-category"
          @click="openEditForm('new', {})">
          {{ $t("AddRootCategory") }}
        </button>
        <div class="categories__toggle-show">
          <span
            :class="{ 'categories__list--active': !showSubCategories }"
            @click="showSubCategories = false">
            {{ $t("CollapseAll") }}
          </span>
          |
          <span
            :class="{ 'categories__list--active': showSubCategories }"
            @click="showSubCategories = true">
            {{ $t("ExpandAll") }}
          </span>
        </div>
        <ul>
          <li
            v-for="category in categories"
            :key="category.id"
            class="categories__list-item">
            <span
              :class="{
                'categories__list--active':
                  currentCategory?.id === category?.id,
              }"
              @click="openEditForm('edit', category)">
              {{ category.title }}
            </span>
            <ul
              v-if="showSubCategories"
              class="categories__sub-list">
              <subcategory
                v-for="subcategory in category.childs"
                :key="subcategory.id"
                :category="subcategory"
                :show-edit-form="openEditForm"
                :current-category="currentCategory" />
            </ul>
          </li>
        </ul>
      </div>
      <div class="categories__main">
        <create-category
          v-if="showCreateCategory"
          :current-category="currentCategory"
          :current-mode="currentMode"
          :add-subcategory-mode="openEditForm" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Subcategory from "./components/Subcategory.vue";
import CreateCategory from "./components/CreateCategory.vue";
import { useStore } from "@/store";
import { ActionType } from "@/store/modules/Categories/ActionType";
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { Category, NewCategory } from "@/types/Category";
import { MutationType } from "@/store/modules/Categories/MutationType";
export default defineComponent({
  name: "CategoriesPage",
  components: { CreateCategory, Subcategory },
  setup() {
    const store = useStore();
    const categories = computed(() => store.state.categories.categories);
    const showSubCategories = ref(true);
    const showCreateCategory = ref(false);
    const currentMode = ref("new");
    const currentCategory: { value: Category | NewCategory } = ref({});
    const openEditForm = (mode: string, category: Category | NewCategory) => {
      showCreateCategory.value = true;
      currentMode.value = mode;
      store.commit(MutationType.SET_CURRENT_CATEGORY, category);
      currentCategory.value = { ...store.state.categories.currentCategory };
    };
    onBeforeMount(() => {
      store.dispatch(ActionType.GET_CATEGORIES);
    });
    return {
      store,
      categories,
      showSubCategories,
      showCreateCategory,
      currentCategory,
      openEditForm,
      currentMode,
    };
  },
});
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px 20px;
  &__header {
    margin-bottom: 15px;
    font-size: 26px;
    font-weight: bold;
  }
  &__content {
    display: flex;
    flex-grow: 1;
    background: white;
    border-radius: 10px;
  }
  &__list {
    width: 25%;
    border-right: 1px solid gray;
    padding: 15px 20px;
    & ul {
      list-style: none;
      padding: 0px 10px;
      margin-top: 10px;
      overflow: auto;
    }

    &--active {
      color: var(--select-navigation-color);
    }
  }
  &__create-category {
    padding: 8px 8px;
    border-radius: 5px;
    background: var(--select-navigation-color);
    color: white;
    margin-bottom: 15px;
    outline: none;
  }
  &__toggle-show {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    & span {
      cursor: pointer;
      &:hover {
        color: var(--select-navigation-color);
      }
    }
  }
  &__list-item {
    margin-bottom: 15px;
    & span {
      &:hover {
        color: var(--select-navigation-color);
        cursor: pointer;
      }
    }
  }
  &__sub-list {
    padding: 0px 10px;
  }
  &__main {
    width: 75%;
    padding: 15px 20px;
  }
}
</style>
