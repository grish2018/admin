<template>
  <li class="subcategory">
    <router-link
      active-class="subcategory--active"
      class="subcategory__item"
      :to="{ name: RouteNames.EDIT_CATEGORY, params: { id: category.id } }">
      <!-- @click="openEditForm(category)" -->
      {{ category.title }}
    </router-link>
    <ul>
      <subcategory
        v-for="subcategory in category.childs"
        :key="subcategory.id"
        :category="subcategory"
        :current-category="currentCategory"
        @openEditForm="openEditForm" />
    </ul>
  </li>
</template>

<script lang="ts">
import { RouteNames } from "@/router/RouteNames";
import { Category, NewCategory } from "@/types/Category";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Subcategory",
  props: {
    category: {
      type: Object as () => Category,
      default: null,
    },
    currentCategory: {
      type: Object as () => Category,
      default: () => ({}),
    },
  },
  emits: ["openEditForm"],
  setup(_, { emit }) {
    function openEditForm(category: Category | NewCategory) {
      emit("openEditForm", category);
    }
    return { openEditForm, RouteNames };
  },
});
</script>

<style lang="scss" scoped>
.subcategory {
  margin-bottom: 10px;
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
