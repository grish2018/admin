<template>
  <div
    v-if="currentRouteName !== RouteNames.CREATE_CATEGORY && route.params.id"
    class="category-header">
    <span class="category-header__title">
      {{
        currentRouteName === RouteNames.ADD_SUB_CATEGORY
          ? `${$t("AddCategoryTo")} 11`
          : `${$t("Category")} 111`
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
import { Category } from "@/types/Category";
import { computed, defineComponent } from "vue";
import { RouteNames } from "@/router/RouteNames";
import { useRoute } from "vue-router";

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
    currentMode: {
      type: String,
      default: "",
    },
    currentTab: {
      type: String,
      default: "",
    },
  },
  setup() {
    const route = useRoute();
    const currentRouteName = computed(() => route.name);
    return { linksList, currentRouteName, RouteNames, route };
  },
});
</script>

<style lang="scss" scoped>
.category-header {
  width: 100%;
  height: 20%;
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
