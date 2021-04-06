<template>
  <div class="categories">
    <span class="categories__header">
      {{ $t("Categories") }}
    </span>

    <div class="categories__content">
      <div class="categories__list">
        <router-link
          class="categories__create-category"
          :to="{ name: RouteNames.CREATE_CATEGORY }">
          {{ $t("AddRootCategory") }}
        </router-link>
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
            <router-link
              active-class="categories__list--active"
              class="categories__list-item-link"
              :to="{
                name: RouteNames.EDIT_CATEGORY,
                params: { id: category.id },
              }">
              {{ category.title }}
            </router-link>
            <ul
              v-if="showSubCategories"
              class="categories__sub-list">
              <subcategory
                v-for="subcategory in category.childs"
                :key="subcategory.id"
                :category="subcategory" />
            </ul>
          </li>
        </ul>
      </div>
      <div class="categories__main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Subcategory from "./components/Subcategory.vue";
import { useStore } from "@/store";
import { RouteNames } from "@/router/RouteNames";
import { ActionType } from "@/store/modules/Categories/ActionType";
import { computed, defineComponent, onBeforeMount, ref } from "vue";
export default defineComponent({
  name: "CategoriesPage",
  components: {
    Subcategory,
  },
  setup() {
    const store = useStore();
    const categories = computed(() => store.state.categories.categories);
    const showSubCategories = ref(true);
    onBeforeMount(() => {
      store.dispatch(ActionType.GET_CATEGORIES);
    });
    return {
      RouteNames,
      categories,
      showSubCategories,
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
  &__list-item-link {
    text-decoration: none;
    color: black;
    &:hover {
      color: var(--select-navigation-color);
      cursor: pointer;
    }
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
    text-decoration: none;
    display: flex;
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
  }

  &__sub-list {
    padding: 0px 10px;
  }
  &__main {
    width: 75%;
    display: flex;
    flex-direction: column;
  }
}
</style>
