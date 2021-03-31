<template>
  <div class="modal">
    <header class="modal__header">
      <slot name="title">
        <p>
          {{ $t(title) }}
        </p>
      </slot>
      <button
        class="modal__close"
        @click="closeModal">
        <svg-icon
          class="modal__close-icon"
          name="cancel" />
      </button>
    </header>
    <main class="modal__content">
      <slot>
        <p>
          {{ $t("Content") }}
        </p>
      </slot>
    </main>
    <footer class="modal__footer">
      <slot name="footer">
        <button
          class="modal__button cancel"
          @click="closeModal">
          {{ $t("Cancel") }}
        </button>
        <button
          class="modal__button confirm"
          @click="confirmModal">
          {{ $t("Confirm") }}
        </button>
      </slot>
    </footer>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalPage",
  props: {
    title: {
      type: String,
      default: "Title",
    },
  },
  emits: {
    close: null,
    confirm: null,
  },
  setup(_props, { emit }) {
    function closeModal() {
      emit("close");
    }
    function confirmModal() {
      emit("confirm");
      closeModal();
    }

    return { closeModal, confirmModal };
  },

});
</script>

<style lang="scss">
  .modal {
    position: fixed;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 500px;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    box-shadow: 0 0 8px 6px rgba(34, 60, 80, 0.2);
    &__header {
      padding: 10px 10px 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    &__close {
      display: flex;
        background-color: #fff;
    }
    &__content {
      padding: 40px 20px;
    }
    &__button {
      width: 50%;
      padding: 13px 13px;
      &:hover {
        color: white;
        background-color: #068EEF;
      }
    }
    &__close-icon {
      width: 15px;
      height: 15px;
    }
  }
</style>
