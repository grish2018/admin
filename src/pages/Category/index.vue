<template>
  <div class="category">
    <category-header :title="currentCategory.title" />
    <router-view
      :current-category="currentCategory"
      @toggleShowModal="toggleShowModal" />
    <teleport to="#app">
      <modal
        v-if="showModal"
        @close="toggleShowModal(false)">
        <template #title>
          {{ $t("Products") }}
        </template>
        <products-list
          :current-category="currentCategory"
          @toggleShowModal="toggleShowModal" />
        <template #footer>
          <div />
        </template>
      </modal>
    </teleport>
  </div>
</template>

<script lang="ts">
import CategoryHeader from "./components/CategoryHeader.vue";
import Modal from "@/components/Modal.vue";
import ProductsList from "./components/ProductsList.vue";
import { computed, defineComponent, onBeforeMount, ref, watch } from "vue";
import { Category, NewCategory } from "@/types/Category";
import { useStore } from "@/store";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Category",
  components: {
    CategoryHeader,
    Modal,
    ProductsList,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const showModal = ref(false);
    const toggleShowModal = (value: boolean) => {
      showModal.value = value;
    };

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
    onBeforeMount(() => {
      currentCategory.value = {
        ...findById(categories.value, +route.params.id),
      };
    });
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
    return { currentCategory, toggleShowModal, showModal, categories };
  },
});
</script>

<style lang="scss" scoped>
.category {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
