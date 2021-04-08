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
        <loader-component v-if="loader" />
        <div v-else-if="categories.length === 0">
          <p>{{ $t("NoCategory") }}</p>
        </div>
        <ul v-else>
          <subcategory
            v-for="category in categories"
            :key="category.id"
            :category="category"
            :show-sub-categories="showSubCategories" />
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
import LoaderComponent from "@/components/LoaderComponent.vue";
import { useStore } from "@/store";
import { RouteNames } from "@/router/RouteNames";
import { ActionType } from "@/store/modules/Categories/ActionType";
import { computed, defineComponent, onBeforeMount, ref } from "vue";
export default defineComponent({
  name: "Categories",
  components: {
    Subcategory,
    LoaderComponent,
  },
  setup() {
    const store = useStore();
    const loader = ref(true);
    const categories = computed(() => store.state.categories.categories);
    const showSubCategories = ref(true);
    onBeforeMount(async () => {
      await store.dispatch(ActionType.GET_CATEGORIES);
      loader.value = false;
    });
    return {
      RouteNames,
      categories,
      showSubCategories,
      loader,
    };
  },
});
</script>

<style lang="scss" >
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
    position: relative;
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
    justify-content: center;
    text-align: center;
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
  &__main {
    width: 75%;
    display: flex;
    flex-direction: column;
  }
}
</style>
