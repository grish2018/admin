<template>
  <div class="modal">
    <header class="modal__header">
      <slot name="title">
        <p>
          Title
        </p>
      </slot>
      <button class="close">
        <img
          src="@/assets/img/cancel.svg"
          alt="close">
      </button>
    </header>
    <main class="modal__content">
      <slot>
        <p>
          Content
        </p>
      </slot>
    </main>
    <footer class="modal__footer">
      <slot name="footer">
        <button
          class="modal__button cancel"
          @click.prevent="cancelModal">
          Отменить
        </button>
        <button
          class="modal__button confirm"
          @click="confirmModal">
          Вставить
        </button>
      </slot>
    </footer>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ModalPage",
  setup(props, { emit }) {
    const cancel = ref(true);
    const confirm = ref(true);

    function cancelModal() {
      emit("cancel", cancel);
    }
    function confirmModal() {
      emit("cancel", confirm);
    }

    return { cancelModal, confirmModal };
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
      .close {
        display: flex;
      }
    }
    &__content {
      padding: 40px 20px;
    }
    &__footer {
      .modal__button {
        width: 50%;
        padding: 13px;
        &:hover {
          color: white;
          background-color: #068EEF;
        }
      }
    }
    &__icon-close {
      cursor: pointer;
    }
  }
</style>
