<template>
  <transition name="fade">
    <div
      v-if="errorMessage"
      class="error-plate">
      <span>{{ errorMessage }}</span>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ErrorPlate",
  props: {
    errorMessage: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
}
.error-plate {
  position: absolute;
  border: 1px solid red;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2dede;
  margin-bottom: 20px;
  border-radius: 19px;
  top: 45px;
  & span {
    color: red;
  }
}
</style>
