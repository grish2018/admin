<template>
  <div class="category-header">
    <span class="category-header__title">
      {{
        `${
          isRouteAddSubCategory ? $t("AddCategoryTo") : $t("Category")
        } ${title}`
      }}
    </span>
    <div
      v-if="!isRouteAddSubCategory"
      class="category-header__nav">
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
    title: {
      type: String,
      default: "",
    },
  },
  setup() {
    const route = useRoute();
    const isRouteAddSubCategory = computed(
      () => route.name === RouteNames.ADD_SUB_CATEGORY
    );
    return {
      linksList,
      RouteNames,
      route,
      isRouteAddSubCategory,
    };
  },
});
</script>

<style lang="scss" >
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
