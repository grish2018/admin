<template>
  <div class="category-header">
    <span class="category-header__title">
      {{
        currentRouteName === RouteNames.ADD_SUB_CATEGORY
          ? `${$t("AddCategoryTo")} ${currentCategoryValue.title}`
          : `${$t("Category")} ${currentCategoryValue.title}`
      }}
    </span>
    <div class="category-header__nav">
      <router-link
        v-for="link in linksList"
        :key="link.routeName"
        :to="{ name: link.routeName, params: { id: route.params.id } }"
        active-class="category-header__nav-item--active"
        class="category-header__nav-item">
        <span>
          {{ $t(link.name) }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { RouteNames } from "@/router/RouteNames";
import { useRoute } from "vue-router";
import { Category, NewCategory } from "@/types/Category";

const linksList = [
  {
    name: "Main",
    routeName: RouteNames.EDIT_CATEGORY,
  },
  {
    name: "ProductsInCategory",
    routeName: RouteNames.CATEGORY_PRODUCTS,
  },
];

export default defineComponent({
  name: "CategoryHeader",
  props: {
    currentCategory: {
      type: Object as () => Category,
      default: () => ({}),
    },
  },
  setup(props) {
    const route = useRoute();
    const currentCategoryValue: { value: Category | NewCategory } = ref({
      ...props.currentCategory,
    });
    const currentRouteName = computed(() => route.name);
    watch(
      () => props.currentCategory,
      (newVal) => {
        currentCategoryValue.value = { ...newVal };
      }
    );
    return {
      linksList,
      currentRouteName,
      RouteNames,
      route,
      currentCategoryValue,
    };
  },
});
</script>

<style lang="scss" scoped>
.category-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  border-bottom: 1px solid gray;
  &__title {
    width: 100%;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 45px;
  }
  &__nav {
    display: flex;
  }
  &__nav-item {
    margin-right: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 10px;
    transition: all 0.3s;
    border: 1px solid transparent;
    text-decoration: none;
    color: black;
    &:hover {
      cursor: pointer;
    }
    &--active {
      border-bottom: 2px solid blue;
    }
  }
}
</style>
