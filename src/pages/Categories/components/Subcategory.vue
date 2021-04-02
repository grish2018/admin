<template>
  <li class="subcategory">
    <span
      :class="{
        'subcategory--active': currentCategory?.id === category?.id,
      }"
      @click="openEditForm(category)">
      {{ category.title }}
    </span>
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
    return { openEditForm };
  },
});
</script>

<style lang="scss" scoped>
.subcategory {
  margin-bottom: 10px;
  & span {
    margin-bottom: 5px;
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
