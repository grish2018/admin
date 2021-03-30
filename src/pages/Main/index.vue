<template>
  <div class="main-page">
    {{ $t("Home") }}
    <button
      class="main-page__button"
      @click="openModal">
      OpenModal
    </button>
    <modal-window
      v-if="isOpenModal"
      @close="closeModal" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import ModalWindow from "./Components/Modal.vue";
export default defineComponent({
  name: "MainPage",
  components: {
    ModalWindow,
  },
  setup() {
    const isOpenModal = ref(false);
    function openModal() {
      isOpenModal.value = true;
    }
    function closeModal() {
      isOpenModal.value = false;
    }
    return { isOpenModal, openModal, closeModal };
  },
});
</script>

<style lang="scss">
.main-page {
  display: flex;
  width: 100%;
  &__button {
    max-height: 50px;
    background: #8c8cff;
  }
}
</style>
