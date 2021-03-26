<template>
  <div class="modal">
    <header class="modal-header">
      <slot name="title">
        <p>
          Title
        </p>
      </slot>
      <img
        class="modal__icon-close"
        src="@/assets/img/cancel.svg"
        alt="close">
    </header>
    <main class="modal-content">
      <slot name="content">
        <p>
          Content
        </p>
      </slot>
    </main>
    <footer class="modal-footer">
      <slot name="footer">
        <button class="modal-footer__button">
          Отменить
        </button>
        <button class="modal-footer__button">
          Вставить
        </button>
      </slot>
    </footer>
  </div>
</template>

<script lang="ts">
/**
 * Шапка на основном экране
 */
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalPage",

});
</script>

<style lang="scss">
  .modal {
    position: absolute;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 500px;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    -webkit-box-shadow: 0 0 8px 6px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0 0 8px 6px rgba(34, 60, 80, 0.2);
    box-shadow: 0 0 8px 6px rgba(34, 60, 80, 0.2);
    &-header {
      padding: 10px 10px 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    &-content {
      padding: 40px 20px 40px 20px;
    }
    &-footer {
      &__button {
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
