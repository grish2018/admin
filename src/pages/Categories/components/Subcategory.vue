<template>
  <li class="subcategory">
    <span
      :class="{
        'subcategory--active': currentCategory?.id === category?.id,
      }"
      @click="showEditForm('edit', category)">
      {{ category.title }}
    </span>
    <ul>
      <subcategory
        v-for="subcategory in category.childs"
        :key="subcategory.id"
        :category="subcategory"
        :show-edit-form="showEditForm" />
    </ul>
  </li>
</template>

<script lang="ts">
import { Category } from "@/types/Category";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Subcategory",
  props: {
    category: {
      type: Object as () => Category,
      default: null,
    },
    showEditForm: {
      type: Function,
      default: () => {
        return true;
      },
    },
    currentCategory: {
      type: Object as () => Category,
      default: {},
    },
  },
  setup(props) {
    return { props };
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
