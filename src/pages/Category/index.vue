<template>
  <div class="category">
    <category-header :title="currentCategory.title" />
    <router-view :current-category="currentCategory" />
  </div>
</template>

<script lang="ts">
import CategoryHeader from "./components/CategoryHeader.vue";
import { computed, defineComponent, ref, watch } from "vue";
import { Category, NewCategory } from "@/types/Category";
import { useStore } from "@/store";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Category",
  components: {
    CategoryHeader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const categories = computed(() => store.state.categories.categories);

    const currentCategory: {
      value: NewCategory | undefined | Category;
    } = ref(undefined);

    const findById = (
      categoties: Category[],
      id: number
    ): Category | undefined => {
      return categoties.reduce((category: Category | undefined, el) => {
        if (category !== undefined) {
          return category;
        }
        if (el.id === id) {
          return el;
        }
        if (el.childs && el.childs.length > 0) {
          return findById(el.childs, id);
        }
      }, undefined);
    };
    watch(
      () => route.params.id,
      (newVal) => {
        currentCategory.value = findById(categories.value, +newVal);
      },
      { immediate: true }
    );
    watch(categories, (newVal) => {
      currentCategory.value = findById(newVal, +route.params.id);
    });
    return { currentCategory, categories };
  },
});
</script>

<style lang="scss" >
.category {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
