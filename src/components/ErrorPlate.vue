<template>
  <transition name="fade">
    <div
      v-if="storeErrorMessage"
      class="error-plate">
      <span>{{ storeErrorMessage }}</span>
    </div>
  </transition>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "ErrorPlate",
  setup() {
    const store = useStore();
    const storeErrorMessage = computed(() => store.state.user.errorMessage);

    return { storeErrorMessage };
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
