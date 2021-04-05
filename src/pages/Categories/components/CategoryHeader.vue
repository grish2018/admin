<template>
  <div
    v-if="currentMode !== 'new'"
    class="category-header">
    <span class="category-header__title">
      {{
        currentMode === "addSubCategory"
          ? `${$t("AddCategoryTo")} ${currentCategory.title}`
          : `${$t("Category")} ${currentCategory.title}`
      }}
    </span>
    <div class="category-header__nav">
      <div
        v-for="tab in tabsList"
        :key="tab.value"
        :class="{
          'category-header__nav-item--active': currentTab === tab.value,
        }"
        class="category-header__nav-item">
        <span @click="$emit('toggleTab', tab.value)">
          {{ $t(tab.name) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Category } from "@/types/Category";
import { defineComponent } from "vue";

const tabsList = [
  {
    name: "Main",
    value: "main",
  },
  {
    name: "ProductsInCategory",
    value: "products",
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
    return { tabsList };
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
    &:hover {
      cursor: pointer;
    }
    &--active {
      border-bottom: 2px solid blue;
    }
  }
}
</style>
