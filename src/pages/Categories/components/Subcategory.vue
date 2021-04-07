<template>
  <li class="subcategory">
    <router-link
      active-class="subcategory--active"
      :class="{
        'subcategory--active': +route.params.id === category.id,
      }"
      class="subcategory__item"
      :to="{ name: RouteNames.EDIT_CATEGORY, params: { id: category.id } }">
      {{ category.title }}
    </router-link>
    <ul v-if="showSubCategories">
      <subcategory
        v-for="subcategory in category.childs"
        :key="subcategory.id"
        :category="subcategory" />
    </ul>
  </li>
</template>

<script lang="ts">
import { RouteNames } from "@/router/RouteNames";
import { Category } from "@/types/Category";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "Subcategory",
  props: {
    category: {
      type: Object as () => Category,
      default: null,
    },
    showSubCategories: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const route = useRoute();
    return { RouteNames, route };
  },
});
</script>

<style lang="scss" >
.subcategory {
  &__item {
    margin-bottom: 5px;
    text-decoration: none;
    color: black;
    &:hover {
      color: var(--select-navigation-color);
      cursor: pointer;
    }
  }

  & ul {
    padding: 0px 15px;
    list-style: none;
    margin-top: 10px;
  }
  &--active {
    color: var(--select-navigation-color);
  }
}
</style>
